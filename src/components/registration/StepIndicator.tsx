
interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Photo & ID" },
    { number: 3, label: "Verification" },
  ];

  return (
    <div className="flex justify-between mb-8">
      {steps.map(({ number, label }) => (
        <div
          key={number}
          className={`flex flex-col items-center ${
            number === currentStep ? "text-migii-primary" : number < currentStep ? "text-green-500" : "text-gray-300"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              number === currentStep
                ? "bg-migii-primary text-white"
                : number < currentStep
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {number < currentStep ? "✓" : number}
          </div>
          <span className="text-xs">{label}</span>
        </div>
      ))}
    </div>
  );
};
