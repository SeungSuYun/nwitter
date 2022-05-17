import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, query, orderBy, onSnapshot, doc } from "firebase/firestore";
import dbService from "fbase";
import Nweet from "Components/Nweet";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

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
        try {
            const docRef = await addDoc(collection(dbService, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setNweet("");
        } catch (err) {
            console.log("Error adding document: ", err);
        };
    };

    const onChange = (event) => {
        setNweet(event.target.value);
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <input
                        type="text" placeholder="What's on your mind?"
                        value={nweet} onChange={onChange} maxLength={120} />
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