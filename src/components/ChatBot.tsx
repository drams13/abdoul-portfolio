


import React, { useState } from 'react';
import { MessageSquare, Send, X, Loader2 } from 'lucide-react'; // Ajout de Loader2 pour l'attente
import { chatWithAI } from '../services/geminiService'; // IMPORTATION DU SERVICE

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: string, parts: any[]}[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Pour afficher que l'IA réfléchit

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    // 1. Ajouter le message de l'utilisateur
    const userMessage = { role: "user", parts: [{ text: input }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true); // Début du chargement

    try {
      // 2. APPEL RÉEL À L'IA GEMINI
      const aiResponse = await chatWithAI(input, messages);
      
      // 3. Ajouter la réponse de l'IA
      setMessages([...updatedMessages, { 
        role: "model", 
        parts: [{ text: aiResponse }] 
      }]);
    } catch (error) {
      console.error("Erreur Chatbot:", error);
      setMessages([...updatedMessages, { 
        role: "model", 
        parts: [{ text: "Désolé, j'ai une erreur de connexion. Vérifie ta clé API !" }] 
      }]);
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-blue-600 p-4 rounded-full text-white shadow-xl hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-[450px] bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Assistant d'Abdoul
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <p className="text-gray-500 text-sm text-center mt-10">
                Posez-moi une question sur le parcours d'Abdoul !
              </p>
            )}
            
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-lg max-w-[85%] text-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white ml-auto rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                }`}
              >
                {m.parts[0].text}
              </div>
            ))}

            {/* Indicateur de chargement */}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Loader2 className="w-3 h-3 animate-spin" />
                L'IA réfléchit...
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white flex">
            <input 
              className="flex-1 border border-gray-300 p-2 rounded-l text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tapez votre message..."
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;



















// import React, { useState } from 'react';
// import { MessageSquare, Send, X } from 'lucide-react';

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState<{role: string, parts: any[]}[]>([]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
    
//     const newMessages = [...messages, { role: "user", parts: [{ text: input }] }];
//     setMessages(newMessages);
//     setInput('');

//     try {
//       // Pour l'instant, simulation de réponse
//       setTimeout(() => {
//         setMessages([...newMessages, { 
//           role: "model", 
//           parts: [{ text: "Bonjour ! Je suis l'assistant d'Abdoul. Comment puis-je vous aider ?" }] 
//         }]);
//       }, 1000);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       <button 
//         onClick={() => setIsOpen(!isOpen)} 
//         className="bg-blue-600 p-4 rounded-full text-white shadow-xl hover:bg-blue-700 transition-colors"
//       >
//         {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
//       </button>

//       {isOpen && (
//         <div className="absolute bottom-16 right-0 w-80 h-96 bg-white shadow-2xl rounded-lg flex flex-col border border-gray-200">
//           <div className="p-4 bg-blue-600 text-white rounded-t-lg font-bold flex items-center gap-2">
//             <MessageSquare className="w-5 h-5" />
//             Assistant d'Abdoul
//           </div>
//           <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
//             {messages.map((m, i) => (
//               <div 
//                 key={i} 
//                 className={`p-3 rounded-lg max-w-[80%] ${
//                   m.role === 'user' 
//                     ? 'bg-blue-500 text-white ml-auto' 
//                     : 'bg-white text-gray-800 border border-gray-200'
//                 }`}
//               >
//                 {m.parts[0].text}
//               </div>
//             ))}
//           </div>
//           <div className="p-3 border-t bg-white flex">
//             <input 
//               className="flex-1 border border-gray-300 p-2 rounded-l text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//               value={input} 
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Tapez votre message..."
//             />
//             <button 
//               onClick={handleSend} 
//               className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition-colors flex items-center"
//             >
//               <Send className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;