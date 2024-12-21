/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import db from "@/lib/server/firebase";

const ImageAnnotation = () => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const docs = querySnapshot.docs.map((doc) => doc.data());
                console.log(docs, "querySnapshot.docs");

                setData(docs);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data ? (
                <ul>
                    {data.map((item: any, index: any) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default ImageAnnotation;
