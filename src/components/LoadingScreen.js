import { useState } from "react"
import socket from "../socket"

export default function LoadingScreen(props) {
    const visible = props.visible;

    

    return <>
        <div style={{display: visible ? "block" : "none"}}>
            <h1 class="error-h1">
                loading...
                <br />
                pls wait
            </h1>   
        </div>
    </>
}