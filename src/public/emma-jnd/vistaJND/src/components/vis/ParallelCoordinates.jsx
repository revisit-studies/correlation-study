import {scaleLinear} from "d3-scale";
import * as d3 from "d3";
import {axisLeft} from "d3-axis";
import {useEffect, useRef} from "react";
import { select } from 'd3-selection';
import {generateDataSet, generateDataSetFixed} from "../../utils/dataGeneration.js";

export default function ParallelCoordinates({v}) {

    const d3Container = useRef(null);

    const createChart = () =>{
        console.log(v, "v")

        const width = 300;
        const height = 300;
        const data=generateDataSetFixed(v, Date.now())
        // data in format [x1,y1], [x2,y2]
        //console.log("data to charts" + data)
        const margin = {
            left: 40,
            top: 20,
            right: 20,
            bottom: 20,
        };

        //consts
        const inner_height = height-margin.bottom;
        const inner_width=width-margin.left-margin.right;
        const leftAry = data.map(d=>d[0]);
        const rightAry = data.map(d=>d[1]);
        const svg = select(d3Container.current);
        svg.selectAll("*").remove()


        //scale
        let leftScale = scaleLinear().range([0,inner_height]);
        let rightScale = scaleLinear().range([0,inner_height]);

        //domain
        leftScale.domain([d3.min(leftAry), d3.max(leftAry)]).range([0,inner_height]);
        rightScale.domain([d3.min(rightAry), d3.max(rightAry)]).range([0,inner_height]);

        //axis
        const leftAxis = axisLeft(leftScale).tickSize(0).tickValues([])
        const rightAxis = axisLeft(rightScale).tickSize(0).tickValues([])
        const leftAxisTransform = `translate(${margin.left},${margin.top})`
        const rightAxisTransform = `translate(${margin.left+inner_width},${margin.top})`


        const addAxistoChart =(svg, selector, axis, customClass, transform)=> {
            svg.selectAll(selector)
                .data([0]).enter()
                .append('g')
                .attr('class', customClass);
            svg.selectAll(selector)
                .data([0]).exit()
                .remove();
            svg.selectAll(selector)
                .attr("transform", transform)
                .call(axis);
        }
        // add Axis to chart
        addAxistoChart(svg,'.x.axis',leftAxis,'x axis', leftAxisTransform)
        addAxistoChart(svg,'.y.axis',rightAxis,'y axis', rightAxisTransform)

        //add lines
        svg.selectAll(".line")
            .data(data)
            .enter()
            .append("line")
            .style("stroke", "grey")
            .style("stroke-width", 0.5)
            .attr("x1", margin.left)
            .attr("y1", d=>{
                return leftScale(d[0])+margin.top})
            .attr("x2", margin.left+inner_width)
            .attr("y2", d=>{
                return rightScale(d[1])+margin.top})


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