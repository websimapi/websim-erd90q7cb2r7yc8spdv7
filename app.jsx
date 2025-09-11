import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { WebsimSocket, useQuery } from "@websim/use-query";
const room = new WebsimSocket();
const Header = ({ currentView, setCurrentView }) => /* @__PURE__ */ jsxDEV("header", { className: "bg-white shadow-md sticky top-0 z-10", children: /* @__PURE__ */ jsxDEV("nav", { className: "container mx-auto px-4 py-3 flex justify-between items-center", children: [
  /* @__PURE__ */ jsxDEV("h1", { className: "text-2xl font-bold text-indigo-600", children: "Wee-verse" }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 12,
    columnNumber: 13
  }),
  /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: [
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setCurrentView("gallery"),
        className: `px-3 py-2 text-sm font-medium rounded-md ${currentView === "gallery" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-indigo-100"}`,
        children: [
          /* @__PURE__ */ jsxDEV("i", { className: "fa fa-users mr-1" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 18,
            columnNumber: 21
          }),
          " Gallery"
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 14,
        columnNumber: 17
      }
    ),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setCurrentView("my-wees"),
        className: `px-3 py-2 text-sm font-medium rounded-md ${currentView === "my-wees" ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-indigo-100"}`,
        children: [
          /* @__PURE__ */ jsxDEV("i", { className: "fa fa-user mr-1" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 24,
            columnNumber: 21
          }),
          " My Wees"
        ]
      },
      void 0,
      true,
      {
        fileName: "<stdin>",
        lineNumber: 20,
        columnNumber: 17
      }
    )
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 13,
    columnNumber: 13
  })
] }, void 0, true, {
  fileName: "<stdin>",
  lineNumber: 11,
  columnNumber: 9
}) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 10,
  columnNumber: 5
});
const ImageUploader = ({ onWeeCreated }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };
  const createWee = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    try {
      setStatus("Analyzing your handsome face...");
      const analysisCompletion = await websim.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Is there a human or an animal in this image? Respond with JSON: {"isHumanOrAnimal": boolean}`
              },
              {
                type: "image_url",
                image_url: { url: image }
              }
            ]
          }
        ],
        json: true
      });
      const result = JSON.parse(analysisCompletion.content);
      if (!result.isHumanOrAnimal) {
        setError("No human or animal detected. Please try another photo!");
        setLoading(false);
        setImage(null);
        setStatus("");
        return;
      }
      setStatus("Creating your Wee... this can take a moment!");
      const imageGenResult = await websim.imageGen({
        prompt: "A cute, friendly, Mii-style cartoon avatar based on the person in the image. Full body, simple background.",
        image_inputs: [{ url: image }],
        aspect_ratio: "1:1"
      });
      const weeImageUrl = imageGenResult.url;
      setStatus("Saving your Wee to the universe...");
      const newWee = await room.collection("wees").create({ image_url: weeImageUrl });
      const currentUser = await window.websim.getCurrentUser();
      const historyRecordId = currentUser.id;
      const existingHistoryRecords = await room.collection("wee_history").filter({ id: historyRecordId }).getList();
      const existingHistory = existingHistoryRecords.length > 0 ? existingHistoryRecords[0] : null;
      const newHistoryEntry = {
        imageUrl: weeImageUrl,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const currentHistoryArray = existingHistory ? existingHistory.history : [];
      const updatedHistory = [...currentHistoryArray, newHistoryEntry];
      await room.collection("wee_history").upsert({
        id: historyRecordId,
        history: updatedHistory
      });
      onWeeCreated(newWee);
      setImage(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setStatus("");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-6 rounded-lg shadow-lg mb-8 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-center text-gray-800 mb-4", children: "Create a New Wee!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 137,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxDEV("label", { htmlFor: "file-upload", className: "w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-gray-50 transition-colors", children: image ? /* @__PURE__ */ jsxDEV("img", { src: image, alt: "Preview", className: "max-h-full max-w-full object-contain rounded-lg" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 141,
        columnNumber: 25
      }) : /* @__PURE__ */ jsxDEV("div", { className: "text-center text-gray-500", children: [
        /* @__PURE__ */ jsxDEV("i", { className: "fas fa-camera text-4xl mb-2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 144,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("p", { children: "Tap to upload a photo" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 145,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 143,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 139,
        columnNumber: 17
      }),
      /* @__PURE__ */ jsxDEV("input", { id: "file-upload", type: "file", accept: "image/*", className: "hidden", onChange: handleImageChange, disabled: loading }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 149,
        columnNumber: 17
      }),
      error && /* @__PURE__ */ jsxDEV("p", { className: "text-red-500 mt-2 text-sm", children: error }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 151,
        columnNumber: 27
      }),
      /* @__PURE__ */ jsxDEV("button", { onClick: createWee, disabled: !image || loading, className: "mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center", children: loading ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "loader mr-3", style: { width: "20px", height: "20px", borderWidth: "3px" } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 156,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("span", { children: status || "Creating..." }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 155,
        columnNumber: 25
      }) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("i", { className: "fas fa-magic mr-2" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 161,
          columnNumber: 29
        }),
        /* @__PURE__ */ jsxDEV("span", { children: "Make my Wee" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 162,
          columnNumber: 29
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 160,
        columnNumber: 25
      }) }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 17
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 138,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 136,
    columnNumber: 9
  });
};
const WeeCard = ({ wee }) => {
  const [user, setUser] = useState({ username: "loading..." });
  useEffect(() => {
    if (wee.user_id) {
      window.websim.getUser(wee.user_id).then((u) => {
        if (u) setUser(u);
        else setUser({ username: "Unknown" });
      });
    }
  }, [wee.user_id]);
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 fade-in", children: [
    /* @__PURE__ */ jsxDEV("img", { src: wee.image_url, alt: "A Wee", className: "w-full h-auto aspect-square object-cover" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 185,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-gray-50", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxDEV("img", { src: `https://images.websim.com/avatar/${user.username}`, className: "w-6 h-6 rounded-full mr-2", alt: user.username }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 188,
        columnNumber: 21
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-gray-700 truncate", children: user.username }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 189,
        columnNumber: 21
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 187,
      columnNumber: 17
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 186,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 184,
    columnNumber: 9
  });
};
const WeeGallery = () => {
  const { data: wees, loading } = useQuery(room.query("SELECT w.id, w.image_url, w.user_id, w.created_at FROM public.wees w ORDER BY w.created_at DESC"));
  if (loading && (!wees || wees.length === 0)) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center p-10", children: /* @__PURE__ */ jsxDEV("div", { className: "loader mx-auto", style: { borderColor: "#4f46e5", borderBottomColor: "#f0f4f8" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 200,
      columnNumber: 50
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 200,
      columnNumber: 16
    });
  }
  if (!wees || wees.length === 0) {
    return /* @__PURE__ */ jsxDEV("p", { className: "text-center text-gray-500 py-10", children: "No Wees in the universe yet. Be the first!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 204,
      columnNumber: 16
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4", children: wees.map((wee) => /* @__PURE__ */ jsxDEV(WeeCard, { wee }, wee.id, false, {
    fileName: "<stdin>",
    lineNumber: 209,
    columnNumber: 30
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 208,
    columnNumber: 9
  });
};
const MyWees = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    window.websim.getCurrentUser().then(setCurrentUser);
  }, []);
  const { data: history, loading } = useQuery(
    currentUser ? room.collection("wee_history").filter({ id: currentUser.id }) : null
  );
  const userHistory = history && history.length > 0 ? history[0].history : [];
  const reversedHistory = [...userHistory].reverse();
  if (loading) {
    return /* @__PURE__ */ jsxDEV("div", { className: "text-center p-10", children: /* @__PURE__ */ jsxDEV("div", { className: "loader mx-auto", style: { borderColor: "#4f46e5", borderBottomColor: "#f0f4f8" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 229,
      columnNumber: 50
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 229,
      columnNumber: 16
    });
  }
  if (reversedHistory.length === 0) {
    return /* @__PURE__ */ jsxDEV("p", { className: "text-center text-gray-500 py-10", children: "You haven't created any Wees yet. Let's make one!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 233,
      columnNumber: 16
    });
  }
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: reversedHistory.map((item, index) => /* @__PURE__ */ jsxDEV("div", { className: "bg-white p-4 rounded-lg shadow-md flex items-center space-x-4 fade-in", children: [
    /* @__PURE__ */ jsxDEV("img", { src: item.imageUrl, alt: "My Wee", className: "w-20 h-20 rounded-lg object-cover" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 240,
      columnNumber: 22
    }),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-grow", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-gray-500", children: "Created on:" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 242,
        columnNumber: 26
      }),
      /* @__PURE__ */ jsxDEV("p", { className: "font-medium text-gray-800", children: new Date(item.createdAt).toLocaleString() }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 243,
        columnNumber: 26
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 241,
      columnNumber: 22
    })
  ] }, index, true, {
    fileName: "<stdin>",
    lineNumber: 239,
    columnNumber: 18
  })) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 237,
    columnNumber: 9
  });
};
function App() {
  const [wees, setWees] = useState([]);
  const [currentView, setCurrentView] = useState("gallery");
  const handleWeeCreated = useCallback((newWee) => {
  }, []);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(Header, { currentView, setCurrentView }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 263,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("main", { className: "container mx-auto p-4 flex-grow", children: [
      /* @__PURE__ */ jsxDEV(ImageUploader, { onWeeCreated: handleWeeCreated }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 265,
        columnNumber: 17
      }, this),
      currentView === "gallery" && /* @__PURE__ */ jsxDEV(WeeGallery, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 267,
        columnNumber: 47
      }, this),
      currentView === "my-wees" && /* @__PURE__ */ jsxDEV(MyWees, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 268,
        columnNumber: 47
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 264,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "text-center py-4 text-sm text-gray-500", children: "Welcome to the Wee-verse!" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 270,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 262,
    columnNumber: 9
  }, this);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 278,
  columnNumber: 13
}));
