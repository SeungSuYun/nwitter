import { useEffect, useRef, useState } from "react";
import { dbService, storageService } from "fbase";
import { addDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid";
import Nweet from "components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        const q = query(
            collection(dbService, "nweets"),
            orderBy("createdAt", "desc")
        );
        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        });
    }, []);

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
        <>
            <form onSubmit={onSubmit}>
                {attachment && <div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
                <div>
                    <input
                        type="text" placeholder="What's on your mind?"
                        value={nweet} onChange={onChange} maxLength={120} />
                    <input type="file" accept="image/*" onChange={onFileChange} ref={fileInput} />
                    <input type="submit" value="Nweet" />
                </div>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;