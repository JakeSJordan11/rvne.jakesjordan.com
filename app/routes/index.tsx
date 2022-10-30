import type { ChangeEvent, PointerEvent } from "react";
import { useState, useRef, useEffect } from "react";
import colors from "tailwindcss/colors";

export default function Index() {
  const [numberNode1Value, setNumberNode1Value] = useState("2");
  const [numberNode2Value, setNumberNode2Value] = useState("8");
  const [currentPath, setCurrentPath] = useState<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }>();
  const outputPort1 = useRef<HTMLButtonElement>(null);
  const outputPort2 = useRef<HTMLButtonElement>(null);
  const inputPort1 = useRef<HTMLButtonElement>(null);
  const inputPort2 = useRef<HTMLButtonElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredPort, setHoveredPort] = useState<HTMLButtonElement | null>();
  const [startPort, setStartPort] = useState<HTMLButtonElement | null>();
  const [pathColor, setPathColor] = useState("");
  const [mathValue, setMathValue] = useState(0);
  const [paths, setPaths] = useState<
    {
      startPort: HTMLButtonElement;
      endPort: HTMLButtonElement;
    }[]
  >([]);

  const NODE_COLORS = {
    number: "bg-neutral-300 dark:bg-neutral-500",
    math: "bg-blue-500 dark:bg-blue-800",
  };
  const PATH_COLORS = {
    number: "stroke-neutral-300 dark:stroke-neutral-500",
    math: "stroke-blue-500 dark:stroke-blue-800",
    gradient: {
      stop1: {
        light: colors.blue[500],
        dark: colors.blue[800],
      },
      stop2: {
        light: colors.neutral[300],
        dark: colors.neutral[500],
      },
    },
  };

  function handleNumberNode1Change(event: ChangeEvent<HTMLInputElement>) {
    setNumberNode1Value(event.target.value);
    if (outputPort1.current?.getAttribute("data-port-connected") === "true") {
      if (inputPort1.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(event.target.value));
      }
      if (inputPort2.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(event.target.value));
      }
      if (
        inputPort1.current?.getAttribute("data-port-connected") === "true" &&
        inputPort2.current?.getAttribute("data-port-connected") === "true"
      ) {
        setMathValue(Number(event.target.value) + Number(numberNode2Value));
      }
    }
  }

  function handleNumberNode2Change(event: ChangeEvent<HTMLInputElement>) {
    setNumberNode2Value(event.target.value);
    if (outputPort2.current?.getAttribute("data-port-connected") === "true") {
      if (inputPort1.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(event.target.value));
      }
      if (inputPort2.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(event.target.value));
      }
      if (
        inputPort1.current?.getAttribute("data-port-connected") === "true" &&
        inputPort2.current?.getAttribute("data-port-connected") === "true"
      ) {
        setMathValue(Number(event.target.value) + Number(numberNode1Value));
      }
    }
  }

  function handleDown(event: PointerEvent) {
    setIsDragging(true);
    let port;
    setStartPort(port);
    switch (event.currentTarget) {
      case outputPort1.current:
        port = outputPort1.current;
        break;
      case outputPort2.current:
        port = outputPort2.current;
        break;
      case inputPort1.current:
        port = inputPort1.current;
        break;
      case inputPort2.current:
        port = inputPort2.current;
        break;
    }
    if (port?.getAttribute("data-port-connected") === "false") {
      setStartPort(port);
      port && port.parentElement?.id.includes("number")
        ? setPathColor(PATH_COLORS.number)
        : setPathColor(PATH_COLORS.math);
      port &&
        setCurrentPath({
          x1: port.getBoundingClientRect().x + 4,
          y1: port.getBoundingClientRect().y + 4,
          x2: port.getBoundingClientRect().x + 4,
          y2: port.getBoundingClientRect().y + 4,
        });
    }
  }

  function handleMove(event: PointerEvent) {
    if (isDragging) {
      setCurrentPath((currentPath) => {
        if (currentPath) {
          return {
            x1: currentPath.x1,
            y1: currentPath.y1,
            x2: event.clientX,
            y2: event.clientY,
          };
        }
      });
    }
  }

  function handleUp() {
    setIsDragging(false);
    setCurrentPath(undefined);
    if (hoveredPort?.parentElement?.id !== startPort?.parentElement?.id) {
      if (
        hoveredPort?.parentElement?.getAttribute("data-node-type") !==
        startPort?.parentElement?.getAttribute("data-node-type")
      ) {
        hoveredPort &&
          setPaths([
            ...paths,
            {
              startPort: startPort!,
              endPort: hoveredPort,
            },
          ]);
      }
    }
  }

  function handleOver(event: PointerEvent) {
    if (isDragging) {
      switch (event.currentTarget) {
        case inputPort1.current:
          inputPort1.current?.getAttribute("data-port-connected") === "false" &&
            setHoveredPort(inputPort1.current);
          break;
        case inputPort2.current:
          inputPort2.current?.getAttribute("data-port-connected") === "false" &&
            setHoveredPort(inputPort2.current);
          break;
        case outputPort1.current:
          outputPort1.current?.getAttribute("data-port-connected") ===
            "false" && setHoveredPort(outputPort1.current);
          break;
        case outputPort2.current:
          outputPort2.current?.getAttribute("data-port-connected") ===
            "false" && setHoveredPort(outputPort2.current);
          break;
      }
    }
  }

  function handleLeave() {
    setHoveredPort(null);
  }

  function handleDoubleClick(event: MouseEvent) {
    switch (event.currentTarget) {
      case inputPort1.current:
        inputPort1.current?.getAttribute("data-port-connected") === "true" &&
          setPaths((paths) =>
            paths.filter(
              (path) =>
                path.startPort !== inputPort1.current &&
                path.endPort !== inputPort1.current
            )
          );
        inputPort1.current?.setAttribute("data-port-connected", "false");
        break;
      case inputPort2.current:
        inputPort2.current?.getAttribute("data-port-connected") === "true" &&
          setPaths((paths) =>
            paths.filter(
              (path) =>
                path.startPort !== inputPort2.current &&
                path.endPort !== inputPort2.current
            )
          );
        inputPort2.current?.setAttribute("data-port-connected", "false");
        break;
      case outputPort1.current:
        outputPort1.current?.getAttribute("data-port-connected") === "true" &&
          setPaths((paths) =>
            paths.filter(
              (path) =>
                path.startPort !== outputPort1.current &&
                path.endPort !== outputPort1.current
            )
          );
        outputPort1.current?.setAttribute("data-port-connected", "false");
        break;
      case outputPort2.current:
        outputPort2.current?.getAttribute("data-port-connected") === "true" &&
          setPaths((paths) =>
            paths.filter(
              (path) =>
                path.startPort !== outputPort2.current &&
                path.endPort !== outputPort2.current
            )
          );
        outputPort2.current?.setAttribute("data-port-connected", "false");
        break;
    }
  }

  useEffect(() => {
    if (outputPort1.current?.getAttribute("data-port-connected") === "true") {
      if (inputPort1.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(numberNode1Value));
      }
      if (inputPort2.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(numberNode1Value));
      }
      if (
        inputPort1.current?.getAttribute("data-port-connected") === "true" &&
        inputPort2.current?.getAttribute("data-port-connected") === "true"
      ) {
        setMathValue(Number(numberNode1Value) + Number(numberNode2Value));
      }
    }
    if (outputPort2.current?.getAttribute("data-port-connected") === "true") {
      if (inputPort1.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(numberNode2Value));
      }
      if (inputPort2.current?.getAttribute("data-port-connected") === "true") {
        setMathValue(Number(numberNode2Value));
      }
      if (
        inputPort1.current?.getAttribute("data-port-connected") === "true" &&
        inputPort2.current?.getAttribute("data-port-connected") === "true"
      ) {
        setMathValue(Number(numberNode1Value) + Number(numberNode2Value));
      }
    }
  }, [numberNode1Value, numberNode2Value, isDragging]);

  return (
    <main
      className="h-screen dark:bg-neutral-800"
      onPointerUp={handleUp}
      onPointerMove={handleMove}
    >
      {/* number node1 */}
      <article
        className={`${NODE_COLORS.number} flex absolute top-10 left-10 flex-col justify-between p-4 w-28 h-28 rounded-xl border-2 select-none border-neutral-800 cursor-grab dark:border-neutral-300`}
        data-node-type="number"
        id="number-node1"
      >
        <input
          className="py-2 text-2xl font-bold text-center rounded-lg border-2 pointer-events-none select-none border-neutral-800 bg-neutral-50 dark:bg-neutral-300"
          value={numberNode1Value}
          onChange={handleNumberNode1Change}
          data-np-checked
        />
        <input
          className="w-full h-2 rounded border-2 appearance-none border-neutral-800 accent-neutral-50"
          type="range"
          max={10}
          value={numberNode1Value}
          onChange={handleNumberNode1Change}
          data-np-checked
        />
        <button
          className={`${NODE_COLORS.number} absolute left-1/2 top-full w-2 h-2 rounded-full ring-2 -translate-x-1/2 -translate-y-1/3 ring-neutral-800 cursor-crosshair bg-neutral-300 dark:bg-neutral-500 dark:ring-neutral-300`}
          ref={outputPort1}
          id="outputPort1"
          data-port-type="output"
          data-port-connected={
            paths.find(
              (path) =>
                path.startPort === outputPort1.current ||
                path.endPort === outputPort1.current
            )
              ? true
              : false
          }
          onPointerDown={handleDown}
          onPointerLeave={handleLeave}
          onPointerOver={handleOver}
          onDoubleClick={() => handleDoubleClick}
        />
      </article>
      {/* number node2 */}
      <article
        className={`${NODE_COLORS.number} flex absolute top-10 left-96 flex-col justify-between p-4 w-28 h-28 rounded-xl border-2 select-none border-neutral-800 cursor-grab dark:border-neutral-300`}
        data-node-type="number"
        id="number-node2"
      >
        <input
          className="py-2 text-2xl font-bold text-center rounded-lg border-2 pointer-events-none select-none border-neutral-800 bg-neutral-50 dark:bg-neutral-300"
          value={numberNode2Value}
          onChange={handleNumberNode2Change}
          data-np-checked
        />
        <input
          className="w-full h-2 rounded border-2 appearance-none border-neutral-800 accent-neutral-50"
          type="range"
          max={10}
          value={numberNode2Value}
          onChange={handleNumberNode2Change}
          data-np-checked
        />
        <button
          className={`${NODE_COLORS.number} absolute left-1/2 top-full w-2 h-2 rounded-full ring-2 -translate-x-1/2 -translate-y-1/3 ring-neutral-800 cursor-crosshair bg-neutral-300 dark:bg-neutral-500 dark:ring-neutral-300`}
          ref={outputPort2}
          id="outputPort2"
          data-port-type="output"
          data-port-connected={
            paths.find(
              (path) =>
                path.startPort === outputPort2.current ||
                path.endPort === outputPort2.current
            )
              ? true
              : false
          }
          onPointerDown={handleDown}
          onPointerLeave={handleLeave}
          onPointerOver={handleOver}
        />
      </article>
      {/* math node */}
      <article
        className={`${NODE_COLORS.math} flex absolute left-52 top-80 flex-col p-4 w-28 h-28 rounded-xl border-2 select-none border-neutral-800 cursor-grab dark:border-neutral-300`}
        data-node-type="math"
        id="math-node1"
      >
        <button
          className="absolute top-0 left-1/4 w-2 h-2 rounded-full ring-2 -translate-x-1/2 -translate-y-2/3 bg-sky-500 cursor-crosshair ring-neutral-800 dark:bg-sky-800 dark:ring-neutral-300"
          ref={inputPort1}
          id="inputPort1"
          data-port-type="input"
          data-port-connected={
            paths.find(
              (path) =>
                path.startPort === inputPort1.current ||
                path.endPort === inputPort1.current
            )
              ? true
              : false
          }
          onPointerDown={handleDown}
          onPointerLeave={handleLeave}
          onPointerOver={handleOver}
          onDoubleClick={() => handleDoubleClick}
        />
        <button
          className="absolute top-0 left-3/4 w-2 h-2 rounded-full ring-2 -translate-x-1/2 -translate-y-2/3 bg-sky-500 cursor-crosshair ring-neutral-800 dark:bg-sky-800 dark:ring-neutral-300"
          ref={inputPort2}
          id="inputPort2"
          data-port-type="input"
          data-port-connected={
            paths.find(
              (path) =>
                path.startPort === inputPort2.current ||
                path.endPort === inputPort2.current
            )
              ? true
              : false
          }
          onPointerDown={handleDown}
          onPointerLeave={handleLeave}
          onPointerOver={handleOver}
          onDoubleClick={() => handleDoubleClick}
        />
        <div className="text-2xl font-bold text-center text-mono text-neutral-900">
          Add
        </div>
        <div
          className="py-2 text-2xl font-bold text-center rounded-lg border-2 pointer-events-none select-none border-neutral-800 bg-neutral-50 dark:bg-neutral-300"
          data-np-checked
        >
          {mathValue}
        </div>
      </article>
      {/* connectors */}
      <svg className="absolute pointer-events-none" height="100%" width="100%">
        <style>
          {`
                #stop1 {
                  stop-color: ${PATH_COLORS.gradient.stop1.light};
                }
                #stop2 {
                  stop-color: ${PATH_COLORS.gradient.stop2.light};
                }
                @media (prefers-color-scheme: dark) {
                  #stop1 {
                    stop-color: ${PATH_COLORS.gradient.stop1.dark};
                  }
                  #stop2 {
                    stop-color: ${PATH_COLORS.gradient.stop2.dark};
                  }
                }
              `}
        </style>
        <linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
          <stop id="stop1" offset="0%" />
          <stop id="stop2" offset="100%" />
        </linearGradient>
        {paths.map((path, index) => (
          <path
            key={index}
            stroke="url(#a)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M ${path.startPort.getBoundingClientRect().x + 4} ${
              path.startPort.getBoundingClientRect().y + 4
            } L ${path.endPort.getBoundingClientRect().x + 4} ${
              path.endPort.getBoundingClientRect().y + 4
            }`}
          />
        ))}
        {currentPath && (
          <path
            className={pathColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={`M${currentPath.x1} ${currentPath.y1} L${currentPath.x2} ${currentPath.y2}`}
          />
        )}
      </svg>
    </main>
  );
}
