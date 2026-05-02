import { faEraser, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import "./SearchFilterKnowError.css";
import Button from "../../../../components/UI/Button/Button.tsx";
import CustomDatePicker from "../../../../components/form/CustomDatePicker/CustomDatePicker.tsx";

type Props = {
  onSearch: (formData: {
    title: string;
    status: string;
    affectedSystems: string;
    tags: string;
    initialDate: string;
    finalDate: string;
  }) => void;
};

function SearchFilterKnowError({ onSearch }: Props) {
  const [filters, setFilters] = useState({
    title: "",
    status: "",
    tags: "",
    affectedSystems: "",
    initialDate: "",
    finalDate: "",
  });

  const [words, setWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log("words no submit:", words); // ← adiciona aqui
    onSearch({
      title: filters.title,
      status: filters.status,
      affectedSystems: filters.affectedSystems,
      tags: words.join(","), // ← words está vazio?
      initialDate: filters.initialDate,
      finalDate: filters.finalDate,
    });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue && !words.includes(trimmedValue)) {
        setWords([...words, trimmedValue]);
        setInputValue("");
      }
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    setWords(words.filter((word) => word !== wordToRemove));
  };

  function handleClearFilters(): void {
    const cleared = {
      title: "",
      status: "",
      tags: "",
      affectedSystems: "",
      initialDate: "",
      finalDate: "",
    };
    setFilters(cleared);
    setWords([]);
    onSearch({
      ...cleared,
      tags: "",
    });
  }

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Search</Accordion.Header>
        <Accordion.Body>
          <form onSubmit={handleSubmit}>
            <div className="kedb-search-container">
              <div className="group-search-text">
                <div className="kedb-input-container">
                  <input
                    type="text"
                    placeholder=" "
                    name="title"
                    value={filters.title}
                    onChange={handleInputChange}
                    className="floating-input"
                  />
                  <label className="floating-label">Título</label>
                </div>

                <div className="kedb-input-container">
                  <input
                    type="text"
                    placeholder=" "
                    name="affectedSystems"
                    value={filters.affectedSystems}
                    onChange={handleInputChange}
                    className="floating-input"
                  />
                  <label className="floating-label">Recursos Afetados</label>
                </div>

                <div className="kedb-select-container">
                  <select
                    name="status"
                    value={filters.status}
                    onChange={handleInputChange}
                  >
                    <option value="">Todos os status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="UNDER_ANALYSIS">UNDER_ANALYSIS</option>
                    <option value="DOCUMENTED">DOCUMENTED</option>
                    <option value="SOLUTION_PENDING">SOLUTION_PENDING</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>

              <div className="group-search-date">
                <div className="group-search-date-register">
                  <span>Data de registro inicial</span>
                  <CustomDatePicker
                    value={filters.initialDate}
                    onChange={(value) => setFilters(prev => ({ ...prev, initialDate: value }))}
                  />
                </div>
                <div className="group-search-date-register">
                  <span>Data de registro final</span>
                  <CustomDatePicker
                    value={filters.finalDate}
                    onChange={(value) => setFilters(prev => ({ ...prev, finalDate: value }))}
                  />
                </div>
              </div>

              <div className="group-search-input-tags">
                <div className="word-input-container">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Tags"
                    className="word-input floating-input"
                  />
                  <div className="word-list">
                    {words.map((word, index) => (
                      <div key={index} className="word-chip">
                        {word}
                        <button
                          type="button"
                          onClick={() => handleRemoveWord(word)}
                          className="remove-word-button"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group-search-button">
                <div className="kedb-filters">
                  <Button
                    text="Filtrar"
                    icon={faFilter}
                    background="#0f766e"
                    hoverColor="#0d9488"
                    type="submit"
                    borderRadius="5px"
                    size="small"
                  />
                  <div onClick={handleClearFilters}>
                    <Button
                      text="Limpar"
                      icon={faEraser}
                      background="#0f766e"
                      hoverColor="#0d9488"
                      borderRadius="5px"
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default SearchFilterKnowError;
