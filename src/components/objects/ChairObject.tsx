interface ChairObjectProps {
    isReverse?: boolean;
    isBusy: boolean;
}

const ChairObject = ({ isReverse, isBusy }: ChairObjectProps) => {
    return (
        <div
            className={`chair ${isBusy ? "bg-red-300" : "bg-zinc-700"}`}
            style={{
                width: "8px",
                height: "16px",
                borderRadius: isReverse ? "0px 3px 3px 0px" : "3px 0px 0px 3px",
            }}
        ></div>
    );
};

export default ChairObject;
