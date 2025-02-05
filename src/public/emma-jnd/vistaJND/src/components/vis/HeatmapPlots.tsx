/**
 * Authors: WPI Data Visualization Team
 * Modified by: The ReVISit Team
 * Description:
 *    This file contains the functionality to create a Heatmap Plot.
 */

import * as d3 from 'd3';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { select } from 'd3-selection';
import { generateDataSetFixed } from '../../utils/dataGeneration';

const width = 400;
const height = 40;
const spacing = 10;

export default function HeatmapPlots({ r, onClick }: { r: number, onClick: () => void }) {
  const d3Container = useRef(null);
  const seedRef = useRef(Date.now().toString());

  const [isHover, setIsHover] = useState<boolean>(false);

  const createChart = useCallback(() => {
    const data: [number, number][] = generateDataSetFixed(r, seedRef.current) as [number, number][];

    const xSorted = data.map((d) => d[0]).sort((a, b) => a - b);
    const yCorrelated = data.map((d) => d[1]);

    const svg = select(d3Container.current)
      .attr('width', width)
      .attr('height', height * 2 + spacing);

    svg.selectAll('*').remove();

    // const xScale = scaleLinear()
    //   .domain([d3.min(xSorted)!, d3.max(xSorted)!])
    //   .range([0, width]);

    // const yScale = scaleLinear()
    //   .domain([d3.min(yCorrelated)!, d3.max(yCorrelated)!])
    //   .range([0, width]);

    svg.append('g')
      .selectAll('rect')
      .data(xSorted)
      .enter()
      .append('rect')
      .attr('x', (_, i) => i * (width / xSorted.length))
      .attr('y', 0)
      .attr('width', width / xSorted.length)
      .attr('height', height)
      .style('fill', (d) => d3.interpolateRdBu((d - d3.min(xSorted)!) / (d3.max(xSorted)! - d3.min(xSorted)!)))
      .style('cursor', 'pointer')
      .on('click', () => onClick());

    svg.append('g')
      .selectAll('rect')
      .data(yCorrelated)
      .enter()
      .append('rect')
      .attr('x', (_, i) => i * (width / yCorrelated.length))
      .attr('y', height + spacing)
      .attr('width', width / yCorrelated.length)
      .attr('height', height)
      .style('fill', (d) => d3.interpolateRdBu((d - d3.min(yCorrelated)!) / (d3.max(yCorrelated)! - d3.min(yCorrelated)!)))
      .style('cursor', 'pointer')
      .on('click', () => onClick());
  }, [r, onClick]);

  useEffect(() => {
    createChart();
  }, [createChart]);

  return (
    <svg
      ref={d3Container}
      className="d3-component"
      width={width}
      height={height * 2 + spacing}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <rect
        onClick={onClick}
        x={0}
        y={0}
        width={width}
        height={height * 2 + spacing}
        cursor="pointer"
        opacity={isHover ? 0.2 : 0.0}
        fill="none"
      />
    </svg>
  );
}
