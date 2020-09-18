import React from 'react';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const PurchaseBranches = ({botNumberSelected}) => {
	const botInfo = useSelector((state) => state.userInfo.botBuilds);
	if (!botInfo[botNumberSelected]) return (<></>)
  return (
		<Wrapper>
			<RowOne>
				<FirstRowQuarterBlock>
					{botInfo[botNumberSelected].techTree[4] ?
						<OneToFour animated ={true} className = 'techBranchAngle techGold'/>
						:
						<OneToFour className = 'techBranchAngle techGrey'/>
					}
				</FirstRowQuarterBlock>
				<FirstRowQuarterBlock>
					{botInfo[botNumberSelected].techTree[5] ?
						<OneToFive animated ={true} className = 'techBranchHeight27 techGold'/>
						:
						<OneToFive className = 'techBranchHeight27 techGrey'/>
					}
				</FirstRowQuarterBlock>
				<FirstRowQuarterBlock>
					{botInfo[botNumberSelected].techTree[6] ?
						<TwoToSix animated ={true} className = 'techBranchHeight27 techGold'/>
						:
						<TwoToSix className = 'techBranchHeight27 techGrey'/>
					}
				</FirstRowQuarterBlock>
				<FirstRowQuarterBlock>
					{botInfo[botNumberSelected].techTree[7] ?
						<TwoToSeven animated ={true} className = 'techBranchAngle techGold'/>
						:
						<TwoToSeven className = 'techBranchAngle techGrey'/>
					}
				</FirstRowQuarterBlock>
			</RowOne>
			{[1,2,3].map((rowNumber)=>{
				return(
					<Row key = {rowNumber}>
						{[4+4*rowNumber,5+4*rowNumber,6+4*rowNumber,7+4*rowNumber].map((index)=>{
						return(
							<QuarterBlock key = {index}>
								{botInfo[botNumberSelected].techTree[index] ?
									<Branch animated ={true} className = 'techBranchHeight27 techGold'/>
									:
									<Branch className = 'techBranchHeight27 techGrey'/>
								}
							</QuarterBlock>
						)})}
					</Row>
				)
			})}
			<Row>
			<QuarterBlock>
				{botInfo[botNumberSelected].techTree[21] ?
					<SixteenToTwentyOne animated ={true} className = 'techBranchAngle techGold'/>
					:
					<SixteenToTwentyOne className = 'techBranchAngle techGrey'/>
				}
			</QuarterBlock>
			<QuarterBlock>
				{botInfo[botNumberSelected].techTree[21] ?
					<Branch animated ={true} className = 'techBranchHeight27 techGold'/>
					:
					<Branch className = 'techBranchHeight27 techGrey'/>
				}
			</QuarterBlock>
			<QuarterBlock>
				{botInfo[botNumberSelected].techTree[22] ?
					<Branch animated ={true} className = 'techBranchHeight27 techGold'/>
					:
					<Branch className = 'techBranchHeight27 techGrey'/>
				}
			</QuarterBlock>
			<QuarterBlock>
				{botInfo[botNumberSelected].techTree[22] ?
					<NineteenToTwentyTwo animated ={true} className = 'techBranchAngle techGold'/>
					:
					<NineteenToTwentyTwo className = 'techBranchAngle techGrey'/>
				}
			</QuarterBlock>
			</Row>
		</Wrapper>
  )
}
export default PurchaseBranches;
const Wrapper = styled.div`
	width: 100%;
	height: 0px;
	position: relative;
	top: 50px;
	z-index: 0;
	/* background-color: blue; */
`
const FirstRowQuarterBlock = styled.div`
	height: 80px;
	width: 25%;
`
const QuarterBlock = styled.div`
	height: 75px;
	width: 60px;
`
const RowOne = styled.div`
	display: flex;
	height: 80px;
	width: 100%;
`
const Row = styled.div`
	display: flex;
	height: 75px;
	width: 100%;
	margin: 0 5px;

`
const OneToFour = styled.div`
	animation: ${props => props.animated && '.5s ease-out 1 growBranch4'};
	transform: rotate(30deg);
	left: 60px;
`
const OneToFive = styled.div`
	animation: ${props => props.animated && '.3s ease-out 1 growBranchHeight27'};
	position: relative;
	left: 26px;
	top: 10px;
`
const TwoToSix = styled.div`
	animation: ${props => props.animated && '.3s ease-out 1 growBranchHeight27'};
	position: relative;
	left: 25px;
	top: 10px;
`
const TwoToSeven = styled.div`
	animation: ${props => props.animated && '.5s ease-out 1 growBranch7'};
	transform: rotate(-30deg);
	left: -7px;
	top: -3px;
`
const Branch = styled.div`
	animation: ${props => props.animated && '.3s ease-out 1 growBranchHeight27'};
	position: relative;
	left: 25px;
	top: 5px;
`
const SixteenToTwentyOne = styled.div`
	animation: ${props => props.animated && '.5s ease-out 1 growBranch16'};
	transform: rotate(-30deg);
	left: 55px;
	top: -6px;
`
const NineteenToTwentyTwo = styled.div`
	animation: ${props => props.animated && '.5s ease-out 1 growBranch19'};
	transform: rotate(30deg);
	left: -5px;
	top: -6px;
`