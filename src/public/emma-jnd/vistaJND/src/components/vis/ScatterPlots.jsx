import {scaleLinear} from "d3-scale";
import * as d3 from "d3";
import {axisLeft} from "d3-axis";
import {useEffect, useRef} from "react";
import { select } from 'd3-selection';
import {generateDataSet, generateDataSetFixed} from "../../utils/dataGeneration.js";
import {axisBottom} from "d3";

export default function ScatterPlots({v}) {

    const d3Container = useRef(null);

    const createChart = () => {
        const width = 300;
        const height = 300;
        const data=generateDataSetFixed(v, Date.now())
        // data in format [x1,y1], [x2,y2]
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };
        const inner_height = height-margin.bottom;
        const inner_width=width-margin.left-margin.right;
        const xAry = data.map(d=>d[0]);
        const yAry = data.map(d=>d[1]);
        let xScale = scaleLinear().range([0,inner_width]);
        let yScale = scaleLinear().range([inner_height,0]);
        const xAxis = axisBottom()
            .scale(xScale)
            .tickSize(0)
            .tickFormat(function(d){ return ''; });

        const yAxis = axisLeft()
            .scale(yScale)
            .tickSize(0);
        const svg = select(d3Container.current)
            .attr("width", width)
            .attr("height", height);
        svg.selectAll("*").remove()
        svg.append("g")
            .attr('transform', `translate(0, ${height-margin.bottom})`)
            .attr('class', 'main axis date').call(xAxis);

        svg.append("g")
            .attr('class', 'main axis date').call(yAxis);
        xScale.domain([d3.min(xAry), d3.max(xAry)]).range([0+10,inner_width-10]);
        yScale.domain([d3.min(yAry), d3.max(yAry)]).range([inner_height-10,0+10]);

        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class","dot")
            .attr("r", 2)
            .attr("cx", d=>{
                return xScale(d[0])})
            .attr("cy", d=>{
                return yScale(d[1])})
            .style("fill", 'black')

    }

    useEffect(() => {
        createChart()
    }, [v]);
    return(
        <>
            <svg
                className="d3-component"
                width={300}
                height={300}
                ref={d3Container}
            />
        </>
    )
}