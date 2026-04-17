import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
    /** Deklrasai state **/
    // const [searchTerm, setSearchTerm] = useState("");
    // const [selectedTag, setSelectedTag] = useState("");

    /*Inisialisasi DataForm*/
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
        /*Tambah state lain beserta default value*/
    });

    /*Inisialisasi Handle perubahan nilai input form*/
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    /** Deklrasai Logic Search & Filter **/
    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
        const matchesSearch =
            framework.name
                .toLowerCase()
                .includes(_searchTerm) ||
            framework.description
                .toLowerCase()
                .includes(_searchTerm);

        const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    /** Deklarasi pengambilan unique tags di frameworkData **/
    const allTags = [
        ...new Set(frameworkData.flatMap((framework) => framework.tags)),
    ];


    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 flex justify-center antialiased font-sans">
            <div className="w-full max-w-3xl flex flex-col">

                {/* --- Bagian Header Halaman --- */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                        Eksplorasi Framework Populer
                    </h1>

                </div>
                {/* ----------------------------- */}


                <input
                    type="text"
                    name="searchTerm"
                    placeholder="Search framework..."
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    onChange={handleChange}
                />

                <select
                    name="selectedTag"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    onChange={handleChange}
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag, index) => (
                        <option key={index} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>

                {/* Daftar Card */}
                <div className="flex flex-col gap-6">
                    {filteredFrameworks.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Efek Gradien Halus saat Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Konten Utama */}
                            <div className="relative z-10">
                                {/* Header Card */}
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                                            {item.name}
                                            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                                                {item.details.releaseYear}
                                            </span>
                                        </h2>
                                        <p className="text-sm text-slate-500 mt-1 font-medium">
                                            Dikembangkan oleh <span className="text-slate-800">{item.details.developer}</span>
                                        </p>
                                    </div>

                                    {/* Tombol Kunjungi */}
                                    <a
                                        href={item.details.officialWebsite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex shrink-0 items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-indigo-600 transition-colors duration-200 shadow-sm"
                                    >
                                        Kunjungi Web
                                    </a>
                                </div>

                                {/* Deskripsi */}
                                <p className="text-slate-600 leading-relaxed mb-6">
                                    {item.description}
                                </p>

                                {/* Tags Section */}
                                <div className="flex flex-wrap gap-2.5">
                                    {item.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-slate-100 text-slate-600 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 group-hover:border-slate-300 group-hover:text-slate-800 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}