import { TransformComponent, TransformWrapper, type ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import MapImage from "../../assets/map.png";
import TableObject from "../../components/objects/TableObject";
import { useContext, useRef, useState, type MouseEvent } from "react";
import useTables from "../../hooks/table/useTables";
import { BookingContext } from "../../context/BookingContext";
import TableStateTips from "./TableStateTips";
import RestaurantPlanControls from "./RestaurantPlanControls";
import MouseIcon from "../../assets/icons/mouse.svg";
import PeopleCountSelector from "./PeopleCountSelector";
import useTypes from "../../hooks/table/useTypes";

const RestaurantPlan = () => {
    console.log("[LOG] [RestaurantPlan] Rerendered");

    const [selectedTable, setSelectedTable] = useState<number | null>(null);

    const { bookedTables, isPlanActive, setIsPlanActive } = useContext(BookingContext);

    const { data: tables } = useTables();

    const types = useTypes();

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

    const selectTable = (tableId: number) => {
        setSelectedTable(tableId);
    };

    return (
        <div className="relative w-full h-full">
            <div className="absolute left-6 top-6 z-100">
                <p className="text-xl text-white">x: {x}</p>
                <p className="text-xl text-white">y: {y}</p>
            </div>
            <TransformWrapper ref={transformWrapperRef} minScale={0.6} centerOnInit={true}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="absolute left-3 top-24 flex flex-col gap-3 z-100 bg-neutral-900/30 backdrop-blur-xs ring ring-gray-600 p-3 rounded-xl">
                            <p className="text-md text-white">Select table type:</p>
                            {Object.entries(types).map(([key, value]) => (
                                <div
                                    className="px-3 py-1 bg-gray-800/60 ring ring-gray-600 rounded-lg select-none cursor-pointer"
                                    key={key}
                                >
                                    <p className="text-white text-md">{value}</p>
                                </div>
                            ))}
                        </div>
                        <TableStateTips show={Object.keys(bookedTables).length !== 0} />
                        <RestaurantPlanControls zoomIn={zoomIn} zoomOut={zoomOut} resetTransform={resetTransform} />
                        <PeopleCountSelector />
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
                                {tables?.map((t) => {
                                    return (
                                        <TableObject
                                            table={t}
                                            key={t.id}
                                            state={bookedTables[t.id]}
                                            onClick={selectTable}
                                        ></TableObject>
                                    );
                                })}
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
            {!isPlanActive && (
                <div
                    className="absolute left-0 top-0 w-full h-full z-90 flex items-center justify-center"
                    onWheel={() => setIsPlanActive(true)}
                    onClick={() => setIsPlanActive(true)}
                >
                    <div className="flex gap-2 items-center z-91 animate-bounce">
                        <img src={MouseIcon} alt="Scroll with a mouse to start using" />
                        <p className="text-xl text-white">Scroll with a mouse to start using (or just click)</p>
                    </div>
                    <div className="absolute left-0 top-0 w-full h-full bg-neutral-950/70 animate-pulse"></div>
                </div>
            )}
        </div>
    );
};

export default RestaurantPlan;
