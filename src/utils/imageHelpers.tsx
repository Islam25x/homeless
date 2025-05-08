// تحويل base64 إلى Blob
const base64ToBlob = (base64: string, mimeType: string) => {
    const byteString = atob(base64.split(",")[1]);
    const byteArray = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([byteArray], { type: mimeType });
};

// تجهيز صورة صحيحة
export const getImageSrc = (image?: string) => {
    if (!image) {
        return "/default-image.png";
    }
    if (image.startsWith("data:image")) {
        const blob = base64ToBlob(image, "image/png");
        return URL.createObjectURL(blob);
    }
    if (image.length > 100 && !image.startsWith("http")) {
        return `data:image/png;base64,${image}`;
    }
    return image;
};