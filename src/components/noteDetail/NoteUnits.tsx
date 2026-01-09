
import { NoteUnit } from "@/types";
import { Unit } from "./Unit";

interface NoteUnitsProps {
    units: NoteUnit[];
}

export function NoteUnits({ units }: NoteUnitsProps) {
    if (!units || units.length === 0) return null;

    return (
        <div>
            {units.map((unit, index) => (
                <Unit key={index} unit={unit} index={index} />
            ))}
        </div>
    );
}
