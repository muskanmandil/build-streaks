import "./App.css";
import all_steps from "./roadmap";
import StepCard from "./components/step-card/StepCard";

const App = () => {
  return (
    <div className="app">
      <h1>Welcome !</h1>
      <div className="streaks-div">
        <div className="streak-number">15 🔥 </div>
      </div>
      <div className="steps-container">
        {all_steps.map((step) => {
          return (
            <StepCard id={step.id} title={step.title} color={step.color} all_substeps={step.all_substeps} />
          );
        })}
      </div>
    </div>
  );
};

export default App;
