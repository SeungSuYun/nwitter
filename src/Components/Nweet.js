import dbService from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?")
        ok && await deleteDoc(NweetTextRef);
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(NweetTextRef, {text: newNweet});
        setEditing(false);
    }
    const onChange = (event) => setNewNweet(event.target.value);

    return (
        <div>
            {editing && isOwner ? <>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange} type="text" value={newNweet} required />
                    <input type="submit" value="Update Nweet" />
                </form>
                <button onClick={toggleEditing}>Cancel</button>
            </> :
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>}
        </div>
    )
}

export default Nweet;