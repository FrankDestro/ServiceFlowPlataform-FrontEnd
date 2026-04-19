import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "../../../components/UI/Button/Button";
import CustomSelect from "../../../components/form/CustomSelect/CustomSelect";
import { TicketStatus, TicketStatusLabels } from "../constant/TicketStatus";
import { type CategoryTicketDTO } from "../models/CategoryTicketDTO";
import { type SLADTO } from "../models/slaDTO";
import { type TypeRequestDTO } from "../models/typeRequestDTO";
import * as CategoryTicketService from "../service/category-service";
import * as SlaService from "../service/sla-service";
import * as TypeRequestService from "../service/type-request";
import "./AtualizacaoTicket.css";

function AtualizacaoTicket() {
  const ticketStatusOptions = Object.values(TicketStatus).map((status) => ({
    value: status,
    label: TicketStatusLabels[status],
  }));

  const [typeRequests, setTypeRequests] = useState<TypeRequestDTO[]>([]);
  const [categoryTicket, setCategoryTicket] = useState<CategoryTicketDTO[]>([]);
  const [slaList, setSlaList] = useState<SLADTO[]>([]);

  useEffect(() => {
    TypeRequestService.getAllTypeRequest().then((response) => {
      setTypeRequests(response.data);
    });
    CategoryTicketService.getAllCategoryTicket().then((response) => {
      setCategoryTicket(response.data);
    });

    SlaService.getAllSla().then((response) => {
      setSlaList(response.data);
    });
  }, []);

  const [formData, setFormData] = useState({
    typeRequest: "",
    severity: "",
    category: "",
    typeReq: "",
    analista: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {}

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-atualizacao-ticket">
        <div>
          <h4>Status do chamado</h4>
          <CustomSelect
          
            name="typeRequest"
            value={formData.typeRequest}
            onChange={handleChange}
            options={[
              { value: "", label: "Selecione um status" },
              ...ticketStatusOptions,
            ]}
            width="100%"
            height="40px"
          />
        </div>

        <div>
          <h4>Criticidade</h4>
          <CustomSelect
            
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            options={[
              { value: "", label: "Categoria do Chamado" },
              ...slaList.map((sla) => ({
                value: String(sla.id),
                label: sla.severity,
              })),
            ]}
            width="100%"
            height="40px"
          />
        </div>

        <div>
          <h4>Categoria do chamado</h4>
          <CustomSelect
        
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: "", label: "Categoria do Chamado" },
              ...categoryTicket.map((category) => ({
                value: String(category.id),
                label: category.name,
              })),
            ]}
            width="100%"
            height="40px"
          />
        </div>

        <div>
          <h4>Tipo de Requisição</h4>
          <CustomSelect
            name="typeReq"
            value={formData.typeReq}
            onChange={handleChange}
            options={[
              { value: "", label: "Tipo de Requisição" },
              ...typeRequests.map((type) => ({
                value: String(type.id),
                label: type.name,
              })),
            ]}
            width="100%"
            height="40px"
          />
        </div>

        <div>
          <h4>Analista</h4>
          <CustomSelect
            name="analista"
            value={formData.analista}
            onChange={handleChange}
            options={[
              { value: "", label: "Tipo de Requisição" },
              ...typeRequests.map((type) => ({
                value: String(type.id),
                label: type.name,
              })),
            ]}
            width="100%"
            height="40px"
          />
        </div>

        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button
            text="Salvar Alterações"
            icon={faSave}
            background="#11344d"
            type="submit"
            width="200px"
            borderRadius="5px"
            hoverColor="#11344dc7"
          />
        </div>
      </div>
    </form>
  );
}

export default AtualizacaoTicket;
