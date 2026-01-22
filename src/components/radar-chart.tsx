"use client";

import React from 'react';

interface RadarChartProps {
    data: {
        label: string;
        value: number; // 0 to 100
    }[];
    width?: number;
    height?: number;
    max?: number;
}

export function RadarChart({ data, width = 300, height = 300, max = 100 }: RadarChartProps) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40; // Padding
    const angleSlice = (Math.PI * 2) / data.length;

    // Helper to get coordinates
    const getCoords = (angle: number, value: number) => {
        const x = centerX + Math.cos(angle - Math.PI / 2) * (radius * (value / max));
        const y = centerY + Math.sin(angle - Math.PI / 2) * (radius * (value / max));
        return { x, y };
    };

    // Generate grid points (3 levels: 33%, 66%, 100%)
    const gridLevels = [0.33, 0.66, 1];
    const gridPath = gridLevels.map(level => {
        return data.map((_, i) => {
            const { x, y } = getCoords(angleSlice * i, max * level);
            return `${x},${y}`;
        }).join(" ") + ` ${getCoords(0, max * level).x},${getCoords(0, max * level).y}`; // Close path
    });

    // Generate data points
    const points = data.map((d, i) => {
        const { x, y } = getCoords(angleSlice * i, d.value);
        return `${x},${y}`;
    }).join(" ");

    // Generate labels
    const labels = data.map((d, i) => {
        // Push labels out a bit further than max radius
        const { x, y } = getCoords(angleSlice * i, max + 20);
        return { x, y, text: d.label };
    });

    return (
        <div className="relative flex justify-center items-center">
            <svg width={width} height={height} className="overflow-visible">
                {/* Background Grid */}
                {gridPath.map((path, i) => (
                    <polygon
                        key={i}
                        points={path}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray={i < 2 ? "4 4" : "0"}
                    />
                ))}

                {/* Axis Lines */}
                {data.map((_, i) => {
                    const { x, y } = getCoords(angleSlice * i, max);
                    return (
                        <line
                            key={i}
                            x1={centerX}
                            y1={centerY}
                            x2={x}
                            y2={y}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Data Area */}
                <polygon
                    points={points}
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="#16a34a"
                    strokeWidth="2"
                />

                {/* Data Points */}
                {data.map((d, i) => {
                    const { x, y } = getCoords(angleSlice * i, d.value);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            fill="#16a34a"
                            className="drop-shadow-sm"
                        />
                    );
                })}

                {/* Labels */}
                {labels.map((label, i) => (
                    <text
                        key={i}
                        x={label.x}
                        y={label.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-[10px] sm:text-xs font-bold fill-slate-500 font-sans"
                    >
                        {label.text}
                    </text>
                ))}
            </svg>
        </div>
    );
}
