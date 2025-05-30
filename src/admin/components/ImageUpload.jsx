import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { useRef, useState } from "react";
import { BiCamera } from "react-icons/bi";
import { FaUpload } from "react-icons/fa6";

const ImageKitUpload = ({pushImages}) => {
    const [progress, setProgress] = useState(0);

    const fileInputRef = useRef(null);
    const abortController = new AbortController();

    const authenticator = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth`);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }
        const file = fileInput.files[0];

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, 
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            pushImages(uploadResponse?.url)
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };

    return (
        <>
            {/* File input element using React ref */}
            <label className="border border-gray-500 rounded-lg p-5 w-[70px] h-[70px] flex flex-col border-dotted items-center justify-center" for="ProductImageUpload">
                <BiCamera className="w-6 h-6"/>
            </label>
            <input hidden type="file" ref={fileInputRef} onChange={handleUpload} id="ProductImageUpload"/>
            {/* Button to trigger the upload process */}
            {/* <button type="button" className="bg-black text-white p-1 rounded-md " onClick={handleUpload}>
                Upload file
            </button> */}
            <br />
            {/* Display the current upload progress */}
            Upload progress: <progress value={progress} max={100}></progress>
        </>
    );
};

export default ImageKitUpload;