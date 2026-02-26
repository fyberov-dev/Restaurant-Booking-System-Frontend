import { TransformComponent, TransformWrapper, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import ZoomInIcon from "../../assets/icons/zoom_in.svg";
import ZoomOutIcon from "../../assets/icons/zoom_out.svg";
import ResetIcon from "../../assets/icons/reset.svg";
import MapImage from "../../assets/map.png";
import TableObject from "../../components/objects/TableObject";
import { useContext, useRef, useState, type MouseEvent } from "react";
import useTables from "../../hooks/table/useTables";
import { BookingContext } from "../../context/BookingContext";

const RestaurantPlan = () => {
    console.log("[LOG] [RestaurantPlan] Rerendered");

    const { bookings } = useContext(BookingContext);
    const bookingsWithKeys = Object.fromEntries(bookings.map((b) => [b.tableId, b]));

    const { data: tables } = useTables();

    const transformWrapperRef = useRef<ReactZoomPanPinchContentRef | null>(null);

    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);

    const handleOnMouseMove = (e: MouseEvent) => {
        const current = transformWrapperRef.current;
        const scale = current?.instance.transformState.scale ?? 1;

        const rect = e.currentTarget.getBoundingClientRect();

        const x = (e.clientX - rect.left) / scale;
        const y = (e.clientY - rect.top) / scale;

        setX(x);
        setY(y);
    };

    return (
        <>
            <div className="absolute left-6 top-6 z-100">
                <p className="text-xl text-white">x: {x}</p>
                <p className="text-xl text-white">y: {y}</p>
            </div>
            <TransformWrapper ref={transformWrapperRef} minScale={0.6} centerOnInit={true}>
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
                                    <TableObject table={t} key={t.id} isBusy={t.id in bookingsWithKeys}></TableObject>
                                ))}
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </>
    );
};

export default RestaurantPlan;
