import { TransformComponent, TransformWrapper, type ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import ZoomInIcon from "./assets/icons/zoom_in.svg";
import ZoomOutIcon from "./assets/icons/zoom_out.svg";
import ResetIcon from "./assets/icons/reset.svg";
import MapImage from "./assets/map.png";
import TableObject from "./components/objects/TableObject";
import { useState, type MouseEvent } from "react";
import useTables from "./hooks/table/useTables";

function App() {
    const [zoomScale, setZoomScale] = useState<number>(1);
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const handleOnMouseMove = (e: MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const x = (e.clientX - rect.left) / zoomScale;
        const y = (e.clientY - rect.top) / zoomScale;

        setX(x);
        setY(y);
    };

    const handleOnZoom = (e: ReactZoomPanPinchRef) => {
        setZoomScale(e.state.scale);
    };

    const { data: tables } = useTables();

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-taupe-950">
            <div className="relative w-2/3 h-2/3">
                <div className="absolute left-6 top-6 z-100">
                    <p className="text-xl text-white">x: {x}</p>
                    <p className="text-xl text-white">y: {y}</p>
                </div>
                <TransformWrapper minScale={0.6} centerOnInit={true} onZoom={handleOnZoom}>
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <>
                            <div className="absolute right-6 bottom-6 z-100">
                                <div className="relative flex gap-3">
                                    <button
                                        className="w-9 aspect-square flex items-center justify-center bg-white rounded-lg text-3xl cursor-pointer"
                                        onClick={() => zoomIn()}
                                    >
                                        <img src={ZoomInIcon} alt="Zoom in" />
                                    </button>
                                    <button
                                        className="w-9 aspect-square flex items-center justify-center bg-white rounded-lg text-3xl cursor-pointer"
                                        onClick={() => zoomOut()}
                                    >
                                        <img src={ZoomOutIcon} alt="Zoom out" />
                                    </button>
                                    <button
                                        className="w-9 aspect-square flex items-center justify-center bg-white rounded-lg text-3xl cursor-pointer"
                                        onClick={() => resetTransform()}
                                    >
                                        <img src={ResetIcon} alt="Reset zoom" />
                                    </button>
                                </div>
                            </div>
                            <TransformComponent
                                wrapperStyle={{
                                    position: "relative",
                                    width: "100%",
                                    height: "100%",
                                    border: "1px solid green",
                                    borderRadius: "48px",
                                }}
                            >
                                <div className="w-full h-full" onMouseMove={handleOnMouseMove}>
                                    <div
                                        style={{
                                            width: "760px",
                                            height: "660px",
                                        }}
                                    >
                                        <img src={MapImage} alt="" />
                                    </div>
                                    {tables?.map((t) => (
                                        <TableObject table={t} key={t.id}></TableObject>
                                    ))}
                                </div>
                            </TransformComponent>
                        </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
}

export default App;
