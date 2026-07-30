/**
 * screen-capture.js
 * 
 * Primeira etapa do coletor:
 * captura autorizada de tela/janela pelo navegador.
 *
 * IMPORTANTE:
 * - O navegador sempre pede autorização ao usuário.
 * - Não captura nada escondido.
 * - Nesta etapa NÃO existe OCR.
 * - Nesta etapa NÃO existe envio para servidor.
 */

class ScreenCapture {

    static stream = null;
    static video = null;
    static canvas = null;
    static ctx = null;
    static previewTimer = null;

    static init() {

        const btnStart = document.getElementById("btnIniciarCaptura");
        const btnStop = document.getElementById("btnPararCaptura");
        const video = document.getElementById("screenPreview");
        const canvas = document.getElementById("screenCanvas");
        const status = document.getElementById("statusCaptura");

        if (!btnStart || !btnStop || !video || !canvas || !status) {
            console.error(
                "ScreenCapture: elementos da interface não encontrados."
            );
            return;
        }

        this.video = video;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        btnStart.addEventListener(
            "click",
            () => this.start()
        );

        btnStop.addEventListener(
            "click",
            () => this.stop()
        );

        this.setStatus(
            "Aguardando autorização para capturar a tela.",
            "idle"
        );

        console.log(
            "ScreenCapture inicializado."
        );
    }

    static async start() {

        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getDisplayMedia) {

            this.setStatus(
                "Este navegador não oferece captura de tela.",
                "error"
            );

            return;
        }

        try {

            this.setStatus(
                "Solicitando permissão de captura...",
                "waiting"
            );

            /*
             * O navegador abrirá a caixa de seleção:
             *
             * - Tela inteira
             * - Janela
             * - Aba
             *
             * O usuário escolhe manualmente o que deseja compartilhar.
             */

            this.stream =
                await navigator.mediaDevices.getDisplayMedia({

                    video: {
                        frameRate: {
                            ideal: 10,
                            max: 15
                        }
                    },

                    audio: false

                });

            const videoTrack =
                this.stream.getVideoTracks()[0];

            if (!videoTrack) {

                throw new Error(
                    "Nenhuma fonte de vídeo foi selecionada."
                );

            }

            /*
             * Se o usuário parar o compartilhamento
             * pelo próprio navegador, detectamos aqui.
             */

            videoTrack.addEventListener(
                "ended",
                () => {

                    this.stop();

                }
            );

            this.video.srcObject =
                this.stream;

            await this.video.play();

            this.setStatus(
                "CAPTURA ATIVA — tela recebida pelo sistema.",
                "active"
            );

            const btnStart =
                document.getElementById(
                    "btnIniciarCaptura"
                );

            const btnStop =
                document.getElementById(
                    "btnPararCaptura"
                );

            if (btnStart) {
                btnStart.disabled = true;
            }

            if (btnStop) {
                btnStop.disabled = false;
            }

            /*
             * Começa a desenhar os frames no canvas.
             *
             * Por enquanto isso é apenas uma prova de captura.
             * Na próxima etapa poderemos passar esses frames
             * para o detector/OCR.
             */

            this.startPreview();

            console.log(
                "Captura iniciada."
            );

        } catch (error) {

            console.error(
                "Erro ao iniciar captura:",
                error
            );

            this.setStatus(
                "Captura não iniciada: " + error.message,
                "error"
            );

        }

    }

    static startPreview() {

        if (this.previewTimer) {
            clearInterval(this.previewTimer);
        }

        this.previewTimer =
            setInterval(
                () => {

                    if (
                        !this.video ||
                        !this.video.videoWidth ||
                        !this.video.videoHeight
                    ) {
                        return;
                    }

                    this.canvas.width =
                        this.video.videoWidth;

                    this.canvas.height =
                        this.video.videoHeight;

                    this.ctx.drawImage(
                        this.video,
                        0,
                        0,
                        this.canvas.width,
                        this.canvas.height
                    );

                },
                250
            );

    }

    static stop() {

        if (this.previewTimer) {

            clearInterval(
                this.previewTimer
            );

            this.previewTimer = null;

        }

        if (this.stream) {

            this.stream
                .getTracks()
                .forEach(
                    track => track.stop()
                );

            this.stream = null;

        }

        if (this.video) {

            this.video.pause();
            this.video.srcObject = null;

        }

        const btnStart =
            document.getElementById(
                "btnIniciarCaptura"
            );

        const btnStop =
            document.getElementById(
                "btnPararCaptura"
            );

        if (btnStart) {
            btnStart.disabled = false;
        }

        if (btnStop) {
            btnStop.disabled = true;
        }

        this.setStatus(
            "Captura parada.",
            "idle"
        );

        console.log(
            "Captura encerrada."
        );

    }

    static setStatus(message, type) {

        const status =
            document.getElementById(
                "statusCaptura"
            );

        if (!status) {
            return;
        }

        status.textContent =
            message;

        status.dataset.status =
            type;

    }

}


/*
 * Inicialização quando o HTML estiver pronto.
 */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        ScreenCapture.init();

    }
);
