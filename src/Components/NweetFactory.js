import { useRef, useState } from "react";
import { dbService, storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { addDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";


const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(response.ref)
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        }

        try {
            await addDoc(collection(dbService, "nweets"), nweetObj);
            setNweet("");
            setAttachment("");
        } catch (err) {
            console.log("Error adding document: ", err);
        };
    };
    const onChange = (event) => {
        setNweet(event.target.value);
    }

    const onFileChange = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onloadend = (event) => {
            setAttachment(event.target.result);
        }
        file && reader.readAsDataURL(file);
    }

    const fileInput = useRef();
    const onClearAttachment = () => {
        setAttachment("");
        fileInput.current.value = "";
    }

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }} />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory