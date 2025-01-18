import React from "react";
import { Input, TimeInput } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

const AdPreview = ({ selectedAd }) => {
    const parseTimeString = (timeString) => {
        if (!timeString || timeString === "--:--") return null; // Handle invalid or placeholder values
        const [hours, minutes] = timeString.split(":").map(Number);
        return { hours, minutes };
    };

    if (!selectedAd) {
        return <p>No details available.</p>;
    }

    return (
        <div className="bg-[#F2E9EB] flex flex-col p-2 max-w-full rounded-lg">
    

            <main className="flex-grow rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Basic Details */}
                    <div className="bg-white p-1 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">ΣΤΟΙΧΕΙΑ ΕΠΙΜΕΛΗΤΗ</h3>
                        <Textarea
                            size="sm"
                            variant="faded"
                            radius="sm"
                            labelPlacement="outside"
                            label="Βιογραφικό"
                            readOnly
                            defaultValue={selectedAd.bio || "N/A"}
                            minRows={1}
                            maxRows={5}
                            autoResize
                        />
                        {[
                            { label: "Φύλο", value: selectedAd.gender },
                            { label: "Τηλέφωνο Οικίας", value: selectedAd.homephone },
                            { label: "Κινητό 1", value: selectedAd.cellphone1 },
                            { label: "Email", value: selectedAd.email },
                            { label: "Δήμος", value: selectedAd.dimos },
                            { label: "Πόλη", value: selectedAd.city },
                            { label: "Οδός", value: selectedAd.street },
                        ].map(({ label, value }) => (
                            <Input
                                key={label}
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label={label}
                                readOnly
                                defaultValue={value || "N/A"}
                            />
                        ))}
                    </div>

                    {/* Certificates */}
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">ΠΙΣΤΟΠΟΙΗΤΙΚΑ</h3>
                        {selectedAd.certificates &&
                            Object.entries(selectedAd.certificates).map(([key, value]) => (
                                <Input
                                    key={key}
                                    size="sm"
                                    variant="faded"
                                    radius="sm"
                                    labelPlacement="outside"
                                    label={key}
                                    readOnly
                                    defaultValue={value || "N/A"}
                                />
                            ))}
                        <Input
                            size="sm"
                            variant="faded"
                            radius="sm"
                            labelPlacement="outside"
                            label="Εκπαίδευση"
                            readOnly
                            defaultValue={selectedAd.education || "N/A"}
                        />
                    </div>
                    {/* Schedule - Part 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold text-md text-center mb-5">ΩΡΑΡΙΟ (ΜΕΡΟΣ 1)</h3>
                        {[
                            { key: "monday", label: "Δ" },
                            { key: "tuesday", label: "Τ" },
                            { key: "wednesday", label: "Τ" },
                            { key: "thursday", label: "Π" },
                            { key: "friday", label: "Π" },
                            { key: "saturday", label: "Σ" },
                            { key: "sunday", label: "Κ" },
                        ].map(({ key, label }) => (
                            <div key={key} className="mb-4">
                                <div className="flex gap-4 items-center w-1/2">
                                    <h3 className="font-semibold">{label}</h3>
                                    <TimeInput
                                        label="Από"
                                        size="sm"
                                        radius="sm"
                                        variant="faded"
                                        name={`${key}_from`}
                                        hourCycle={24}
                                        aria-label={`Από (${key})`}
                                        labelPlacement='inside'
                                        isDisabled 
                                        defaultValue={parseTimeString(selectedAd.schedule?.[key]?.from)}
                                    />
                                    <TimeInput
                                        label="Έως"
                                        size="sm"
                                        radius="sm"
                                        variant="faded"
                                        name={`${key}_to`}
                                        hourCycle={24}
                                        aria-label={`Έως (${key})`}
                                        labelPlacement='inside'
                                        isDisabled 
                                        defaultValue={parseTimeString(selectedAd.schedule?.[key]?.to)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>


                    {/* Schedule - Part 2 */}
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">ΩΡΑΡΙΟ (ΜΕΡΟΣ 2)</h3>
                     
                        <Input
                            size="sm"
                            variant="faded"
                            radius="sm"
                            labelPlacement="outside"
                            label="Πρόσθετες Πληροφορίες"
                            readOnly
                            defaultValue={selectedAd.extra || "N/A"}
                        />
                        <Input
                            size="sm"
                            variant="faded"
                            radius="sm"
                            labelPlacement="outside"
                            label="Αμοιβή (€)"
                            readOnly
                            defaultValue={selectedAd.payment || "N/A"}
                        />
                        {[
                            { label: "Facebook", value: selectedAd.facebook },
                            { label: "Instagram", value: selectedAd.instagram },
                            { label: "LinkedIn", value: selectedAd.linkedin },
                            { label: "Ημέρα Ραντεβού", value: selectedAd.meetingDay },
                            { label: "Ώρα Ραντεβού", value: selectedAd.meetingTime },
                        ].map(({ label, value }) => (
                            <Input
                                key={label}
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label={label}
                                readOnly
                                defaultValue={value || "N/A"}
                            />
                        ))}
                        {selectedAd.workExperience && (
                            <Input
                                size="sm"
                                variant="faded"
                                radius="sm"
                                labelPlacement="outside"
                                label="Προϋπηρεσία"
                                readOnly
                                defaultValue={`Από: ${selectedAd.workExperience.start?.day}-${selectedAd.workExperience.start?.month}-${selectedAd.workExperience.start?.year} 
                                Έως: ${selectedAd.workExperience.end?.day}-${selectedAd.workExperience.end?.month}-${selectedAd.workExperience.end?.year}`}
                            />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdPreview;
