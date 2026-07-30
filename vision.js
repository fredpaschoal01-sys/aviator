/**
 * vision.js
 * Aviator Vision AI
 *
 * Pré-processa a imagem antes do OCR.
 */

class Vision {

    static init() {

        document.addEventListener(

            "historicoAtualizado",

            () => this.process()

        );

        console.log("Vision iniciado");

    }

    static process() {

        const canvas =
            document.getElementById("historyCanvas");

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        const img =
            ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            );

        const data = img.data;

        for (let i = 0; i < data.length; i += 4) {

            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // escala de cinza
            const gray =
                (r + g + b) / 3;

            // binarização simples
            const color =
                gray > 140 ? 255 : 0;

            data[i] = color;
            data[i + 1] = color;
            data[i + 2] = color;

        }

        ctx.putImageData(img, 0, 0);

        document.dispatchEvent(
            new Event("visionReady")
        );

        console.log("Vision -> imagem preparada");

    }

}

document.addEventListener(
    "DOMContentLoaded",
    () => Vision.init()
);
