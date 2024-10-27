// src/js/confirmText.d.ts
export interface ConfirmText {
    [key: string]: {
        title: string;
        content: string;
        confirmButtonText: string;
        cancelButtonText: string;
        type: string;
    }
}