import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { COUNTRIES } from "../../app/onboarding/constants";

interface ProfileDetailsStepProps {
    country: string;
    age: string;
    occupation: string;
    onChange: (field: "country" | "age" | "occupation", value: string) => void;
}

export function ProfileDetailsStep({ country, age, occupation, onChange }: ProfileDetailsStepProps) {
    return (
        <div className="space-y-5">
            <Select
                label="Country"
                value={country}
                onChange={(e) => onChange("country", e.target.value)}
                options={COUNTRIES}
            />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Age"
                    type="number"
                    placeholder="e.g. 24"
                    value={age}
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (parseInt(val) >= 0 && parseInt(val) <= 99)) {
                            onChange("age", val);
                        }
                    }}
                />
                <Input
                    label="Occupation"
                    placeholder="e.g. Student"
                    maxLength={50}
                    value={occupation}
                    onChange={(e) => onChange("occupation", e.target.value)}
                />
            </div>
        </div>
    );
}
