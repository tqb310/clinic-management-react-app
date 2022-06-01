import {onSnapshot, collection} from 'firebase/firestore';
import {db} from '_services/firebase/app';

export default function useFirestoreRealtime({
    collectionName,
    eventHandler,
}) {
    const firestoreRealtime = () => {
        const unsub = onSnapshot(
            collection(db, collectionName),
            eventHandler,
        );
        return unsub;
    };
    return firestoreRealtime;
}
