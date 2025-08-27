import React from "react";

const NewEvent: React.FC = () => {
    return (
        <div>
            <h2>Nová událost</h2>
            <form>
                <input placeholder="Název" required />
                <input placeholder="Místo" />
                <input type="date" />
                <button type="submit">Vytvořit</button>
            </form>
        </div>
    );
};

export default NewEvent;