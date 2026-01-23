"use client";

import { motion } from "framer-motion";

const UNIVERSITIES = [
    { name: "UBA", url: "https://www.freelogovectors.net/wp-content/uploads/2020/01/UBA_logo_University_of_Buenos_Aires.png" },
    { name: "UTN", url: "https://iconape.com/wp-content/png_logo_vector/utn.png" },
    { name: "UNLP", url: "https://upload.wikimedia.org/wikipedia/commons/7/74/UNLP_Logo_%28cropped%29.svg" },
    { name: "UADE", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Looo_UADE.svg/2560px-Looo_UADE.svg.png" },
    { name: "ITBA", url: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Itba_bsas_logo.png" },
    { name: "Austral", url: "https://dia.austral.edu.ar/skins/Vector/images/Logo_Austral.png" },
    { name: "UCA", url: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Universidad_Cat%C3%B3lica_Argentina.png" },
    { name: "UNLAM", url: "https://repositoriocyt.unlam.edu.ar/retrieve/c67e7076-bc71-47ce-9f29-f8274760fd05" },
    { name: "UNSAM", url: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Logo_UNSAM.png" },
    { name: "UNC", url: "https://biblioteca.mincyt.gob.ar/img/logos/organizations/UNC.svg" },
    { name: "UP", url: "https://fopea.org/wp-content/uploads/2023/11/Universidad-de-Palermo.png" },
];

export function Universities() {
    return (
        <section className="py-16 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center text-sm font-medium text-gray-400 uppercase tracking-widest">
                Elegido por estudiantes de las mejores universidades
            </div>
            <div className="relative w-full overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-gray-50 to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-gray-50 to-transparent" />

                <motion.div
                    className="flex items-center gap-12 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                    {[...UNIVERSITIES, ...UNIVERSITIES].map((uni, i) => (
                        <div key={i} className="flex items-center justify-center w-32 h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <img src={uni.url} alt={uni.name} className="max-w-full max-h-full object-contain" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
