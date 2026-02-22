interface ChairObjectProps {
    isReverse?: boolean;
}

const ChairObject = ({ isReverse }: ChairObjectProps) => {
    return (
        <div
            className="chair bg-zinc-700"
            style={{
                width: "8px",
                height: "16px",
                borderRadius: isReverse ? "0px 3px 3px 0px" : "3px 0px 0px 3px",
            }}
        ></div>
    );
};

export default ChairObject;
