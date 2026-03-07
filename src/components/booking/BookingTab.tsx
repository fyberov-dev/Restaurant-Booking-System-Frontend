import { useCallback, useContext, useEffect, useState } from "react";
import { BookingContext } from "../../context/BookingContext";
import { getDuration, getTiming } from "../../util/timeUtil";
import useCreateBooking from "../../hooks/booking/useCreateBooking";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "../../types/api/ApiResponse";

const BookingTab = () => {
    const { selectedTable, setSelectedTable, fetchBookings, startTime, endTime } = useContext(BookingContext);

    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const { mutate: createBookingMutate, isPending, isSuccess, isError, reset } = useCreateBooking();

    const [responseMessage, setResponseMessage] = useState<string>("");

    const resetAfter = useCallback(
        (ms: number) => {
            setTimeout(() => {
                reset();
            }, ms);
        },
        [reset],
    );

    useEffect(() => {
        if (isSuccess) {
            resetAfter(3000);
        }
    }, [isSuccess, resetAfter]);

    useEffect(() => {
        if (isError) {
            resetAfter(3000);
        }
    }, [isError, resetAfter]);

    const createBooking = () => {
        if (selectedTable && startTime && endTime)
            createBookingMutate(
                {
                    tableId: selectedTable?.id,
                    startsAt: startTime.toISOString(),
                    endsAt: endTime.toISOString(),
                    phone: phone,
                    email: email,
                },
                {
                    onSuccess: () => {
                        setResponseMessage("Table reservation succeed");
                        fetchBookings();
                    },
                    onError: (e: AxiosError<ErrorResponse>) => {
                        setResponseMessage(e.response?.data.detail ?? "");
                    },
                },
            );
        setSelectedTable(null);
        resetForm();
    };

    const resetForm = () => {
        setPhone("");
        setEmail("");
    };

    return (
        <>
            {selectedTable && (
                <div className="pr-3 py-3">
                    <div className="relative h-full flex flex-col justify-between border border-gray-600 rounded-xl bg-neutral-950/80 backdrop-blur-xs z-300">
                        <header className="p-3 border-b border-gray-600">
                            <h3 className="text-white">Selected table</h3>
                        </header>
                        <main className="h-full flex flex-col gap-3">
                            <div className="flex flex-col gap-3 border-b border-gray-600 p-3">
                                <h4 className="text-white text-xl">Table data:</h4>
                                <div className="flex flex-col gap-1">
                                    <p className="text-white">Guests number: {selectedTable?.guests}</p>
                                    <p className="text-white/40">
                                        * up to {selectedTable.guests + 2} guest by adding additional chairs
                                    </p>
                                </div>
                                {!!selectedTable.types.length && (
                                    <>
                                        <p className="text-white">Types:</p>
                                        <ul className="list-disc list-inside text-white flex flex-col gap-2">
                                            {selectedTable.types.map((t) => (
                                                <li>{t.title}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {startTime && endTime && (
                                    <p className="text-white/80">
                                        From <span className="text-white font-bold">{getTiming(startTime)}</span> to{" "}
                                        <span className="text-white font-bold">{getTiming(endTime)}</span>
                                        <span className="text-white/40">({getDuration(startTime, endTime)})</span>
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-3 px-3">
                                <div className="flex flex-col gap-3">
                                    <p className="text-white">Phone number:</p>
                                    <input
                                        name="phone"
                                        type="text"
                                        className="px-3 py-2 ring ring-gray-600 bg-gray-800/30 placeholder:text-gray-300/30 text-white rounded-lg"
                                        placeholder="+372 XXXX XXXX"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <p className="text-white">Email:</p>
                                    <input
                                        type="email"
                                        className="px-3 py-2 ring ring-gray-600 bg-gray-800/30 placeholder:text-gray-300/30 text-white rounded-lg"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </main>
                        <footer className="flex flex-col gap-3 p-3">
                            <button
                                className={`w-full py-2 bg-blue-800/60 rounded-lg text-white ring ring-blue-600 cursor-pointer ${isPending && "opacity-60"}`}
                                onClick={() => createBooking()}
                                disabled={isPending}
                            >
                                Make reservation
                            </button>
                            <button
                                className={`w-full py-2 rounded-lg text-white ring ring-gray-600 cursor-pointer ${isPending && "opacity-60"}`}
                                onClick={() => setSelectedTable(null)}
                                disabled={isPending}
                            >
                                Cancel
                            </button>
                        </footer>
                    </div>
                </div>
            )}
            <div className="absolute right-0 bottom-0 overflow-hidden p-3">
                <div
                    className={`relative px-6 py-2 ring rounded-lg z-500 backdrop-blur-xs transition-all duration-600 ${isSuccess || isError ? "opacity-100" : "opacity-0 translate-y-100"} ${isSuccess && "bg-green-800/60 ring-green-600"} ${isError && "bg-red-800/60 ring-red-600"}`}
                >
                    <p className="text-white text-md">{responseMessage}</p>
                </div>
            </div>
        </>
    );
};

export default BookingTab;
