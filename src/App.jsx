import { useState } from "react";

function App() {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [mortgageType, setMortgageType] = useState("");
  const [monthly, setMonthly] = useState("00.00");
  const [total, setTotal] = useState("00.00");
  const [showDiv, setShowDiv] = useState(false);
  const [errors, setErrors] = useState({});
  const [b, setB] = useState("");

  let a;
  let c;

  function clearAll(e) {
    e.preventDefault();
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("");
    setErrors({});
    setShowDiv(false);
    setB("");
  }

  function submitForm(e) {
    e.preventDefault();
    const newErrors = {};
    if (!b) newErrors.mortgageAmount = "This field is required";
    else if (isNaN(parseInt(b)))
      newErrors.mortgageAmount = "Please enter a valid number";
    if (!mortgageTerm) newErrors.mortgageTerm = "This field is required";
    else if (isNaN(parseInt(mortgageTerm)))
      newErrors.mortgageTerm = "Please enter a valid number";
    if (!interestRate) newErrors.interestRate = "This field is required";
    else if (isNaN(parseInt(interestRate)))
      newErrors.interestRate = "Please enter a valid number";
    else if (interestRate.includes(","))
      newErrors.interestRate = "Please use dot notation";
    if (!mortgageType) newErrors.mortgageType = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form submitted successfully!");
    setErrors({});
    setShowDiv(true);
    a =
      (Number(mortgageAmount.replace(/,/g, "")) * Number(interestRate)) /
      100 /
      12 /
      (1 -
        (1 + Number(interestRate) / 100 / 12) ** (-12 * Number(mortgageTerm)));

    c =
      a -
      Number(mortgageAmount.replace(/,/g, "") / (12 * Number(mortgageTerm)));
    if (mortgageType === "Repayment") {
      setTotal(
        (a * 12 * Number(mortgageTerm)).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else if (mortgageType === "InterestOnly") {
      setTotal(
        (
          a * 12 * Number(mortgageTerm) -
          Number(mortgageAmount.replace(/,/g, ""))
        ).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
    if (mortgageType === "Repayment") {
      setMonthly(
        a.toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    } else if (mortgageType === "InterestOnly") {
      setMonthly(
        c.toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      );
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[hsl(202,86%,94%)] font-PlusJakartaSans w-full">
        <div className="flex lg:flex-row flex-col bg-white lg:w-3xl lg:rounded-2xl overflow-hidden">
          <div className="flex flex-col w-full lg:w-1/2 p-6">
            <div className="flex flex-row justify-between mb-6">
              <span className="font-bold">Mortgage Calculator</span>
              <button
                onClick={clearAll}
                className="underline text-xs text-[hsl(200,24%,40%)] font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-semibold text-[hsl(200,24%,40%)]">
                  Mortgage Amount
                </span>
                <div
                  className={`group flex flex-row border-[1.5px] border-[hsl(200,26%,54%)] rounded-sm focus-within:border-[hsl(61,70%,52%)] transition-colors duration-200 overflow-hidden ${
                    errors.mortgageAmount
                      ? "border-red-700"
                      : "hover:border-black"
                  }`}
                >
                  <span
                    className={`bg-[hsl(202,86%,94%)] px-[11px] py-2 font-semibold text-sm flex items-center text-[hsl(200,24%,40%)] ${
                      errors.mortgageAmount
                        ? "text-white bg-red-700"
                        : "group-focus-within:bg-[hsl(61,70%,52%)] transition-colors duration-200"
                    }`}
                  >
                    £
                  </span>
                  <input
                    type="text"
                    value={b}
                    id="mortgage-amount"
                    onChange={(e) => {
                      const rawValue = e.target.value
                        .replace(/,/g, "")
                        .replace(/\D/g, "");
                      if (rawValue === "") {
                        setB("");
                        return;
                      }
                      const formattedValue = Number(rawValue).toLocaleString();
                      setMortgageAmount(rawValue);
                      setB(formattedValue);
                    }}
                    className="w-full border-0 focus:outline-none text-sm px-2 py-2"
                  />
                </div>
                {errors.mortgageAmount && (
                  <span className="text-red-700 text-xs">
                    {errors.mortgageAmount}
                  </span>
                )}
              </div>
              <div className="flex lg:flex-row flex-col gap-x-4">
                <div className="flex flex-col gap-y-1 lg:w-1/2 w-full">
                  <span className="text-xs font-semibold text-[hsl(200,24%,40%)]">
                    Mortgage Term
                  </span>
                  <div
                    className={`group flex flex-row border-[1.5px] border-[hsl(200,26%,54%)] rounded-sm focus-within:border-[hsl(61,70%,52%)] transition-colors duration-200 overflow-hidden  ${
                      errors.mortgageTerm
                        ? "border-red-700"
                        : "hover:border-black"
                    }`}
                  >
                    <input
                      type="text"
                      value={mortgageTerm}
                      id="mortgage-amount"
                      onChange={(e) => setMortgageTerm(e.target.value)}
                      className="w-full border-0 focus:outline-none text-sm px-2 py-2"
                    />
                    <span
                      className={`bg-[hsl(202,86%,94%)] focus-within:bg-[hsl(61,70%,52%)] px-[11px] py-2 font-semibold text-sm flex items-center text-[hsl(200,24%,40%)]  ${
                        errors.mortgageTerm
                          ? "text-white bg-red-700"
                          : "group-focus-within:bg-[hsl(61,70%,52%)] transition-colors duration-200"
                      }`}
                    >
                      years
                    </span>
                  </div>
                  {errors.mortgageTerm && (
                    <span className="text-red-700 text-xs">
                      {errors.mortgageTerm}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-y-1 lg:w-1/2 w-full">
                  <span className="text-xs font-semibold text-[hsl(200,24%,40%)]">
                    Interest Rate
                  </span>
                  <div
                    className={`group flex flex-row border-[1.5px] border-[hsl(200,26%,54%)] rounded-sm focus-within:border-[hsl(61,70%,52%)] transition-colors duration-200 overflow-hidden ${
                      errors.interestRate
                        ? "border-red-700"
                        : "hover:border-black"
                    }`}
                  >
                    <input
                      type="text"
                      value={interestRate}
                      id="mortgage-amount"
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full border-0 focus:outline-none text-sm px-2 py-2"
                    />
                    <span
                      className={`bg-[hsl(202,86%,94%)] px-[11px] py-2 font-semibold text-sm flex items-center text-[hsl(200,24%,40%)] ${
                        errors.interestRate
                          ? "text-white bg-red-700"
                          : "group-focus-within:bg-[hsl(61,70%,52%)] transition-colors duration-200 "
                      }`}
                    >
                      %
                    </span>
                  </div>
                  {errors.interestRate && (
                    <span className="text-red-700 text-xs">
                      {errors.interestRate}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="text-xs font-semibold text-[hsl(200,24%,40%)]">
                  Mortgage Type
                </span>
                <div className="flex flex-col gap-y-2">
                  {["Repayment", "InterestOnly"].map((type) => (
                    <label
                      key={type}
                      htmlFor={type}
                      className={`flex items-center border-[1.5px] rounded-sm px-4 py-2 text-sm w-full cursor-pointer ${
                        mortgageType === type
                          ? "border-[hsl(61,70%,52%)] bg-lime-50 font-bold"
                          : "border-[hsl(200,26%,54%)] font-bold"
                      }`}
                    >
                      <input
                        type="radio"
                        id={type}
                        name="mortgageType"
                        value={type}
                        onChange={(e) => setMortgageType(e.target.value)}
                        checked={mortgageType === type}
                        className="peer accent-[hsl(61,70%,52%)] mr-3 size-4"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                {errors.mortgageType && (
                  <span className="text-red-700 text-xs">
                    {errors.mortgageType}
                  </span>
                )}
              </div>
              <button
                type="submit"
                onClick={submitForm}
                className="flex items-center justify-center lg:w-3xs w-full py-2.5 bg-[hsl(61,70%,52%)] rounded-3xl font-bold text-sm gap-x-2 cursor-pointer hover:opacity-50"
              >
                <img
                  src="src\images\icon-calculator.svg"
                  alt="calculator"
                  className="h-4.5"
                />
                Calculate Repayments
              </button>
            </div>
          </div>

          <div
            className={`flex flex-col w-full lg:w-1/2 bg-[hsl(202,55%,16%)] lg:rounded-bl-[60px] items-center justify-center p-6 gap-y-2 ${
              showDiv ? "hidden " : ""
            }`}
          >
            <img
              src="src\images\illustration-empty.svg"
              alt=""
              className="h-36"
            />
            <span className="font-semibold text-lg text-white">
              Results shown here
            </span>
            <span className="text-xs text-center text-[hsl(203,41%,72%)]">
              Complete the form and click "calculate repayments" to see what
              tour monthly repayments would be
            </span>
          </div>
          <div
            className={`flex flex-col w-full lg:w-1/2 bg-[hsl(202,55%,16%)] lg:rounded-bl-[60px] p-6 gap-y-2 ${
              showDiv ? " " : "hidden"
            }`}
          >
            <span className="font-semibold text-lg text-white">
              Your results
            </span>
            <span className="text-xs text-[hsl(203,41%,72%)]">
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              "calculate repayments" again.
            </span>
            <div className="w-full flex flex-col border-t-[3px] rounded-sm border-[hsl(61,70%,52%)] bg-[hsl(202,55%,10%)] p-6 gap-y-5 mt-4">
              <div className="flex flex-col gap-y-1.5 border-b-2 pb-4 border-[hsl(202,55%,16%)]">
                <span className="text-xs text-[hsl(203,41%,72%)]">
                  Your monthly repayments
                </span>
                <span className="text-[hsl(61,70%,52%)] text-[40px] font-bold">
                  £<span>{monthly}</span>
                </span>
              </div>
              <div className="flex flex-col gap-y-1.5">
                <span className="text-[hsl(203,41%,72%)] text-xs">
                  Total you'll repay over term
                </span>
                <span className="text-white text-lg font-bold">
                  £<span>{total}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
