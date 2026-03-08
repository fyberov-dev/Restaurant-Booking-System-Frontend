import ZoomInIcon from "../../assets/icons/zoom_in.svg";
import ZoomOutIcon from "../../assets/icons/zoom_out.svg";
import ResetIcon from "../../assets/icons/reset.svg";

interface RestaurantPlanControlsProps {
    zoomIn: () => void;
    zoomOut: () => void;
    resetTransform: () => void;
}

const RestaurantPlanControls = ({ zoomIn, zoomOut, resetTransform }: RestaurantPlanControlsProps) => {
    return (
        <div className="absolute right-3 bottom-3 z-100 select-none">
            <div className="relative flex gap-2">
                <button
                    className="w-11 aspect-square flex items-center justify-center bg-neutral-950/10 ring ring-neutral-800 shadow-xs shadow-neutral-950 backdrop-blur-lg rounded-lg text-3xl cursor-pointer"
                    onClick={() => zoomIn()}
                >
                    <img src={ZoomInIcon} alt="Zoom in" />
                </button>
                <button
                    className="w-11 aspect-square flex items-center justify-center bg-neutral-950/10 ring ring-neutral-800 shadow-xs shadow-neutral-950 backdrop-blur-lg rounded-lg text-3xl cursor-pointer"
                    onClick={() => zoomOut()}
                >
                    <img src={ZoomOutIcon} alt="Zoom out" />
                </button>
                <button
                    className="w-11 aspect-square flex items-center justify-center bg-neutral-950/10 ring ring-neutral-800 shadow-xs shadow-neutral-950 backdrop-blur-lg rounded-lg text-3xl cursor-pointer"
                    onClick={() => resetTransform()}
                >
                    <img src={ResetIcon} alt="Reset zoom" />
                </button>
            </div>
        </div>
    );
};

export default RestaurantPlanControls;
