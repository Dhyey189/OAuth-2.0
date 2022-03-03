import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    useNavigate,
} from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";

export default function Error() {

    return (
        <div className="mx-auto w-fit">
            <h1> Error : 400 Something went Wrong!</h1>
        </div>
    );
}
