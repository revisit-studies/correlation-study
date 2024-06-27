import {useContext, useEffect, useState} from "react";
import {FlowContext} from "../App.jsx";
import {Title, Text, Container, Button, useMantineColorScheme, TextInput, LoadingOverlay} from "@mantine/core";
import {useNavigate, useSearchParams} from "react-router-dom";
import {addUser, defaultExpName, fb} from "../firebase/firebase-config.js";
import ls from 'localstorage-slim';
import {doc, getDoc} from "firebase/firestore";

export default function ExpSetting() {

    const {setExpMode,setExpDB} = useContext(FlowContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const db = "vlat"
    setExpDB(db);

    const pid = searchParams.get("user")
    const module = searchParams.get("module")
    navigate(`/${module}`)



    return (
        <>
            Loading Experiment
        </>
    );
}
