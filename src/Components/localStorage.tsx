import useLocalStorage from "use-local-storage";
import "../css/localstorage.css";


interface FormData {
    singer: string;
    actor: string;
}

const formDefaultData: FormData = {
    singer: '',
    actor: ''
};

export  function LocalStorageDemo() {
    const [formData, setFormData] = useLocalStorage<FormData>("form-data", formDefaultData);

    function handleSingerChange(e: React.ChangeEvent<HTMLInputElement>) {
        const singer = e.target.value;
        setFormData({ ...formData, singer });
    }

    function handleActorChange(e: React.ChangeEvent<HTMLInputElement>) {
        const actor = e.target.value;
        setFormData({ ...formData, actor });
    }

    return (
        <div className="demo">
            <label htmlFor="singer-input">Best Singer</label>
            <input
                id="singer-input"
                type="text"
                value={formData.singer}
                onChange={handleSingerChange}
            />

            <label htmlFor="actor-input">Best Actor</label>
            <input
                id="actor-input"
                type="text"
                value={formData.actor}
                onChange={handleActorChange}
            />
        </div>
    );
}
