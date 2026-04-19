import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import type { TicketDTO, TicketSimpleDTO } from "../models/ticketDTO.ts";
import TicketDetailsPage from "../../../pages/TicketDetailsPage/TicketDetailsPage.tsx";
import TableTicket from "../TableTicket/TableTicket.tsx";
import "./TicketTabsContainer.css";
import TicketFormCreate from "../TicketFormCreate/TicketFormCreate.tsx";
import Pagination from "../../../components/UI/Pagination/Pagination.tsx";

type TicketsProps = {
  tickets: TicketSimpleDTO[];
  onActiveTabChange: (isTabOneActive: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size: number;
  onRowsPerPageChange: (size: number) => void;
};

type Tab = {
  key: string;
  ticket: TicketDTO;
};

function TicketTabsContainer({
  tickets,
  onActiveTabChange,
  currentPage,
  totalPages,
  onPageChange,
  size,
  onRowsPerPageChange,
}: TicketsProps) {
  const [activeKey, setActiveKey] = useState<string | undefined>("1");
  const [openTabs, setOpenTabs] = useState<
    Array<{ key: string; ticket: TicketSimpleDTO | TicketDTO | null }>
  >([{ key: "1", ticket: null }]);

  const handleSelect = (key: string | null) => {
    if (key) {
      setActiveKey(key);
      onActiveTabChange(key === "1");
    }
  };

  const handleCloseTab = (key: string) => {
    const filteredTabs = openTabs.filter((tab) => tab.key !== key);
    setOpenTabs(filteredTabs);
    if (activeKey === key) {
      setActiveKey(filteredTabs.length > 0 ? filteredTabs[0].key : "1");
    }
  };

  const onFilter = (_ticket: TicketSimpleDTO, ticketData: TicketDTO) => {
    const existingTab = openTabs.find(
      (tab) => tab.ticket && tab.ticket.id === ticketData.id
    );

    if (existingTab) {
      setActiveKey(existingTab.key);
    } else {
      const newKey = `chamado-${ticketData.id}`;
      setOpenTabs([...openTabs, { key: newKey, ticket: ticketData }]);
      setActiveKey(newKey);
      onActiveTabChange(false);
    }
  };

  useEffect(() => {
    if (activeKey === "newTicket") {
      if (!openTabs.some((tab) => tab.key === "newTicket")) {
        setOpenTabs([...openTabs, { key: "newTicket", ticket: null }]);
      }
      return;
    }

    if (openTabs.length === 0) {
      setActiveKey("1");
      onActiveTabChange(true);
      return;
    }

    if (activeKey && !openTabs.some((tab) => tab.key === activeKey)) {
      const newActiveKey =
        openTabs.length > 0 ? openTabs[openTabs.length - 1].key : "1";
      setActiveKey(newActiveKey);
    }
  }, [openTabs, activeKey]);

  return (
    <div className="tickets-container">
      <Tabs
        activeKey={activeKey}
        onSelect={handleSelect}
        className="content-table"
      >
        <Tab
          eventKey="1"
          title={
            <>
              <FontAwesomeIcon icon={faList} color="#757575ec" />
              <span style={{ marginLeft: "10px" }}>Tickets</span>
            </>
          }
        >
          <div className="table-tickets-container">
            <TableTicket
              key={activeKey}
              tickets={tickets}
              onFilter={onFilter}
            />
          </div>
          <div className="container-pagination">
          <Pagination
    totalItems={totalPages}
    itemsPerPageOptions={[10, 20, 50]}
    selectedSize={size}
    initialPage={currentPage + 1}
    onPageSizeChange={onRowsPerPageChange}
    onPageChange={(page) => {
        onPageChange(page - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }}
/>
          </div>
        </Tab>

        {openTabs.map((tab) =>
          tab.ticket ? (
            <Tab
              key={tab.key}
              eventKey={tab.key}
              title={
                <>
                  <div className="container-title-tab">
                    <div># {tab.ticket ? tab.ticket.id : "Novo Ticket"}</div>
                    <div className="close-icon">
                      <span
                        onClick={() => handleCloseTab(tab.key)}
                        className="close-title-icon"
                      >
                        x
                      </span>
                    </div>
                  </div>
                </>
              }
            >
              <div className="table-tickets-container">
                <TicketDetailsPage ticket={tab.ticket as TicketDTO} />
              </div>
            </Tab>
          ) : null
        )}
        <Tab
          eventKey="newTicket"
          title={
            <>
              <FontAwesomeIcon icon={faPlus} color="#757575ec" />
              <span style={{ marginLeft: "10px" }}>Novo Ticket</span>
            </>
          }
        >
          <div className="table-tickets-container">
            <h3># Novo ticket</h3>
            <TicketFormCreate />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TicketTabsContainer;
