import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    ChatContainer,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import "./AiAssistant.css";
import tobiasIcon from "../../assets/tobiasAssistant.jpeg";


type MessageModel = {
    message: string;
    sentTime: string;
    sender: string;
    direction: "incoming" | "outgoing";
    position: "single" | "first" | "normal" | "last";
};

function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<MessageModel[]>([
        {
            message: "Olá! Sou o assistente do ServiceFlow. Como posso te ajudar?",
            sentTime: "agora",
            sender: "ServiceFlow AI",
            direction: "incoming",
            position: "single",
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    function handleSend(message: string) {
        const newMessage: MessageModel = {
            message,
            sentTime: "agora",
            sender: "Você",
            direction: "outgoing",
            position: "single",
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                message: "Entendido! Em breve vou implementar a integração com IA. 🚀",
                sentTime: "agora",
                sender: "ServiceFlow AI",
                direction: "incoming",
                position: "single",
            }]);
            setIsTyping(false);
        }, 1500);
    }

    return (
        <>
            {/* ── Botão flutuante ── */}
            <button
                className="ai-fab"
                onClick={() => setIsOpen(prev => !prev)}
                title="Tobias - Assistente ServiceFlow"
            >
                <img src={tobiasIcon} alt="Tobias" className="ai-fab-img" />
            </button>

            {/* ── Chat ── */}
            {isOpen && (
                <div className="ai-assistant-wrap">
                    <div className="ai-assistant-header">
                        <div className="ai-assistant-avatar">
                            <img src={tobiasIcon} alt="Tobias" className="ai-avatar-img" />
                        </div>
                        <div>
                            <div className="ai-assistant-title">Tobias</div>
                            <div className="ai-assistant-subtitle">Assistente do ServiceFlow 🐾</div>
                        </div>
                        <button
                            className="ai-close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="ai-assistant-chat">
                        <MainContainer>
                            <ChatContainer>
                                <MessageList
                                    typingIndicator={
                                        isTyping
                                            ? <TypingIndicator content="ServiceFlow AI está digitando..." />
                                            : null
                                    }
                                >
                                    {messages.map((msg, index) => (
                                        <Message key={index} model={msg} />
                                    ))}
                                </MessageList>
                                <MessageInput
                                    placeholder="Digite sua mensagem..."
                                    onSend={handleSend}
                                    attachButton={false}
                                />
                            </ChatContainer>
                        </MainContainer>
                    </div>
                </div>
            )}
        </>
    );
}

export default AiAssistant;