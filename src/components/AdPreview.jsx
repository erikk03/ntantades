import React from 'react';

const AdPreview = ({ selectedAd }) => {
    if (!selectedAd) {
        return <p>No details available.</p>;
    }

    return (
        <div className="bg-[#F2E9EB] flex flex-col p-2 max-w-full rounded-lg">
            <h1 className="text-xl font-bold text-center mb-2">ΠΡΟΒΟΛΗ ΑΓΓΕΛΙΑΣ</h1>

            <main className="flex-grow rounded-lg">
                <div className="grid grid-cols-3 gap-3">
                    {/* Form 1 Details */}
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">Form 1</h3>
                        <p><strong>Περιγραφή:</strong> {selectedAd.bio}</p>
                        <p><strong>Φύλο:</strong> {selectedAd.gender}</p>
                        <p><strong>Τηλέφωνο Οικίας:</strong> {selectedAd.homephone}</p>
                        <p><strong>Κινητό 1:</strong> {selectedAd.cellphone1}</p>
                        <p><strong>Κινητό 2:</strong> {selectedAd.cellphone2}</p>
                        <p><strong>Email:</strong> {selectedAd.email}</p>
                        <p><strong>Περιφέρεια:</strong> {selectedAd.perifereia}</p>
                        <p><strong>Νομός:</strong> {selectedAd.nomos}</p>
                        <p><strong>Δήμος:</strong> {selectedAd.dimos}</p>
                        <p><strong>Πόλη:</strong> {selectedAd.city}</p>
                        <p><strong>Οδός:</strong> {selectedAd.street}</p>
                        <p><strong>Αριθμός:</strong> {selectedAd.streetnumber}</p>
                        <p><strong>Τ.Κ.:</strong> {selectedAd.zipcode}</p>
                    </div>

                    {/* Form 2 Details */}
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">Form 2</h3>
                        <p><strong>Πιστοποιητικά:</strong></p>
                        <ul className="list-disc pl-4">
                            <li>Παθολόγος: {selectedAd.certificates?.pathologist || 'N/A'}</li>
                            <li>Δερματολόγος: {selectedAd.certificates?.dermatologist || 'N/A'}</li>
                            <li>Ψυχολόγος: {selectedAd.certificates?.psychologist || 'N/A'}</li>
                            <li>Μαθήματα: {selectedAd.certificates?.course || 'N/A'}</li>
                            <li>Γλώσσες: {selectedAd.certificates?.language || 'N/A'}</li>
                            <li>Πρώτες Βοήθειες: {selectedAd.certificates?.firstAid || 'N/A'}</li>
                            <li>Ποινικό Μητρώο: {selectedAd.certificates?.criminalRecord || 'N/A'}</li>
                            <li>Συστατική Επιστολή: {selectedAd.certificates?.letter || 'N/A'}</li>
                        </ul>
                        <p><strong>Εκπαίδευση:</strong> {selectedAd.education}</p>
                    </div>

                    {/* Form 3 Details */}
                    <div className="bg-white p-3 rounded-lg shadow-md">
                        <h3 className="font-bold text-md text-center mb-2">Form 3</h3>
                        <p><strong>Ωράριο:</strong></p>
                        <ul className="list-disc pl-4">
                            {selectedAd.schedule ? (
                                Object.entries(selectedAd.schedule).map(([day, times]) => (
                                    <li key={day}>
                                        {day.charAt(0).toUpperCase() + day.slice(1)}: 
                                        {times.from || 'N/A'} - {times.to || 'N/A'}
                                    </li>
                                ))
                            ) : (
                                <p>Δεν υπάρχουν πληροφορίες για το ωράριο.</p>
                            )}
                        </ul>
                        <p><strong>Πρόσθετες Πληροφορίες:</strong> {selectedAd.extra || 'N/A'}</p>
                        <p><strong>Αμοιβή:</strong> {selectedAd.payment} €</p>
                        <p><strong>Facebook:</strong> {selectedAd.facebook || 'N/A'}</p>
                        <p><strong>Instagram:</strong> {selectedAd.instagram || 'N/A'}</p>
                        <p><strong>LinkedIn:</strong> {selectedAd.linkedin || 'N/A'}</p>
                        <p><strong>Ημέρα Ραντεβού:</strong> {selectedAd.meetingDay || 'N/A'}</p>
                        <p><strong>Ώρα Ραντεβού:</strong> {selectedAd.meetingTime || 'N/A'}</p>
                        <p><strong>Τοποθεσία Εργασίας:</strong> {selectedAd.placeOfWork || 'N/A'}</p>
                        <p><strong>Προϋπηρεσία:</strong> 
                            {selectedAd.workExperience 
                                ? `Από: ${selectedAd.workExperience.start?.day}-${selectedAd.workExperience.start?.month}-${selectedAd.workExperience.start?.year} 
                                Έως: ${selectedAd.workExperience.end?.day}-${selectedAd.workExperience.end?.month}-${selectedAd.workExperience.end?.year}`
                                : 'N/A'}
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdPreview;
