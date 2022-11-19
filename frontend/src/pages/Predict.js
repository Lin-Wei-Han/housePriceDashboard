import * as React from 'react';
//import { useForm } from "react-hook-form";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import * as predictResultAPIs from "../apis/predictResult";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Modal from "react-modal";
import "../dist/css/form.scss";
import "../dist/css/modal.scss";
import sucess from '../dist/image/sucess.gif';

const customStyles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(52, 51, 51, 0.8)",
    },
    content: {
        backgroundColor: "white",
        height: "50%",
        width: "60%",
        border: "rgba(255, 255, 255, 0)",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const Predict = () => {
    const [city, setCity] = React.useState("");
    const [building, setBuilding] = React.useState("");
    const [room, setRoom] = React.useState("");
    const [livingroom, setLivingroom] = React.useState("");
    const [bathroom, setBathroom] = React.useState("");
    const [prediction, setPrediction] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleBuildingChange = (e) => {
        setBuilding(e.target.value);
    };

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleLivingroomChange = (e) => {
        setLivingroom(e.target.value)
    }

    const handleBathroomChange = (e) => {
        setBathroom(e.target.value)
    }

    const predictResult = (_buildingArea, _roomAmount, _livingroomAmount, _bathroomAmount) => {
        const postData = { buildingArea: _buildingArea, roomAmount: _roomAmount, livingroomAmount: _livingroomAmount, bathroomAmount: _bathroomAmount };

        predictResultAPIs.predictResult(postData).then((res) => {
            console.log(res['data']['prediction']);
            setPrediction(res['data']['prediction'])
            handleOpen()
            //setTimeout(() => { handleClose() }, 6000)
        });
    };

    const onSubmit = () => {
        predictResult(building, room, livingroom, bathroom)
    };

    const currencies = [
        {
            value: '新北市',
        },
        {
            value: '台北市',
        },
        {
            value: '桃園市',
        },
        {
            value: '台中市',
        },
        {
            value: '台南市',
        },
        {
            value: '高雄市',
        },
    ];

    React.useEffect(() => {
        predictResultAPIs.getAPI().then((res) => {
            console.log(res);
        })
    }, [])


    return (
        <>
            <section className='body'>
                <Sidebar />
                <section className='container'>
                    <Header />
                    <div className='form-box'>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="縣市別"
                            value={city}
                            onChange={handleCityChange}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            requiredid="outlined-basic"
                            label="坪數（含公設）"
                            variant="outlined"
                            value={building}
                            onChange={handleBuildingChange}
                        />
                        <TextField
                            requiredid="outlined-basic"
                            label="房間數"
                            variant="outlined"
                            value={room}
                            onChange={handleRoomChange}
                        />
                        <TextField
                            requiredid="outlined-basic"
                            label="廳數"
                            variant="outlined"
                            value={livingroom}
                            onChange={handleLivingroomChange}
                        />
                        <TextField
                            requiredid="outlined-basic"
                            label="衛浴數"
                            variant="outlined"
                            value={bathroom}
                            onChange={handleBathroomChange}
                        />
                        <Button variant="contained" type="submit" onClick={() => onSubmit()}>立即預測</Button>
                    </div>
                </section>
            </section >
            <Modal isOpen={open} onRequestClose={handleClose} style={customStyles} contentLabel="Example Modal">
                <div className="predict-card">
                    <img src={sucess} alt="sucess" />
                    <h1>預測結果</h1>
                    <p>${prediction}</p>
                </div>
            </Modal>
        </>
    )
}

export default Predict
