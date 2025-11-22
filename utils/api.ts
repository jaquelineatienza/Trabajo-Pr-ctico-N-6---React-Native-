export const API_URL_REGISTER = "https://u5hvywfa7s4g.share.zrok.io/register";
export const API_URL_RECOGNIZE = "https://u5hvywfa7s4g.share.zrok.io/recognize";

export async function sendRegister(cuil: string, photoUri: string) {
    const form = new FormData();
    form.append("cuil", cuil);
    form.append("image", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);

    const res = await fetch(API_URL_REGISTER, {
        method: "POST",
        headers: {
            "skip_zrok_interstitial": "true"
        },
        body: form,
    });

    return res.json();
}

export async function sendRecognize(photoUri: string) {
    const form = new FormData();
    form.append("image", {
        uri: photoUri,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);

    const res = await fetch(API_URL_RECOGNIZE, {
        method: "POST",
        headers: {
            "skip_zrok_interstitial": "true"
        },
        body: form,
    });

    return res.json();
}
