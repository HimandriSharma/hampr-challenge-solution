import {
	Avatar,
	Button,
	Col,
	Input,
	Row,
	Statistic,
	Table,
	Tag,
	Tooltip,
} from "antd";
import {
	JSXElementConstructor,
	ReactElement,
	ReactFragment,
	useEffect,
	useState,
} from "react";
import { v4 as uuid } from "uuid";
import jsonData from "../data/characters.json";
import type { Character, CharacterTag } from "../types";
import "../App.css";
import { SearchOutlined } from "@ant-design/icons";
const data: Character[] = jsonData as Character[];

const { CheckableTag } = Tag;

const Characters = () => {
	const tagsData = [
		"monster",
		"melee",
		"human",
		"ninja",
		"agile",
		"God",
		"aerial",
		"strong",
		"grappling",
		"defend",
		"attack",
		"block",
		"mercenary",
		"demon",
		"robot",
		"magic",
		"ranged",
		"alien",
		"ghost",
		"grapple",
		"animal",
		"my team",
	];

	const datasource = data.map((row) => ({
		key: row.name,
		name: row.name,
		power: row.abilities[3].abilityScore,
		mobility: row.abilities[0].abilityScore,
		technique: row.abilities[1].abilityScore,
		survivability: row.abilities[2].abilityScore,
		energy: row.abilities[4].abilityScore,
		avatar: row.thumbnail,
		tags: row.tags,
	}));

	const [selectedRow, setSelectedRow] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [searchedArray, setSearchedArray] = useState(datasource);
	const [searchString, setSearchString] = useState("");
	const [selectedTags, setSelectedTags] = useState([""]);
	const [avg, setAvg] = useState({
		power: -1,
		mobility: -1,
		technique: -1,
		survivability: -1,
		energy: -1,
	});

	useEffect(() => {
		if (searchString.length === 0) {
			setSearchedArray(datasource);
		} else {
			const searchedObjects: any[] = [];
			datasource.forEach((singleDataObject) => {
				Object.values(singleDataObject).every((onlyValues: any) => {
					if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
						searchedObjects.push(singleDataObject);
						return;
					}
				});
			});
			setSearchedArray(searchedObjects);
		}
	}, [searchString]);

	useEffect(() => {
		if (selectedRow.length >= 1 && selectedRow.length <= 6) {
			let power = 0;
			let mobility = 0;
			let technique = 0;
			let survivability = 0;
			let energy = 0;
			selectedRow.map((val: any) => {
				power += val.power;
				mobility += val.mobility;
				technique += val.technique;
				survivability += val.survivability;
				energy += val.energy;
			});
			setAvg({
				power: Math.round((power / selectedRow.length) * 100) / 100,
				mobility: Math.round((mobility / selectedRow.length) * 100) / 100,
				technique: Math.round((technique / selectedRow.length) * 100) / 100,
				survivability:
					Math.round((survivability / selectedRow.length) * 100) / 100,
				energy: Math.round((energy / selectedRow.length) * 100) / 100,
			});
		} else if (selectedRow.length === 0) {
			setAvg({
				power: -1,
				mobility: -1,
				technique: -1,
				survivability: -1,
				energy: -1,
			});
		} else {
			console.log("Please select less than or equal to 6 characters");
		}
	}, [selectedRow]);

	useEffect(() => {
		const taggedObjs: any = [];
		datasource.forEach((singleDataObject) => {
			if (selectedTags.length > 1) {
				Object.values(singleDataObject).every(() => {
					let filtered = singleDataObject.tags?.filter((val) => {
						return selectedTags.indexOf(val.tag_name) !== -1;
					});
					if (filtered?.length > 0) {
						taggedObjs.push(singleDataObject);
					}
				});
				setSearchedArray(taggedObjs);
			}
		});
	}, [selectedTags]);

	const columns = [
		{
			// title: "",
			dataIndex: "avatar",
			key: uuid(),
			render: (a: any) => {
				return <Avatar size={34} src={a}  style={{border:"solid 1px #217AFF"}}/>;
			},
		},
		{
			title: "Character",
			dataIndex: "name",
			key: uuid(),
		},
		{
			title: "Tags",
			dataIndex: "tags",
			key: uuid(),
			render: (tags: any[]) => {
				return (
					tags &&
					tags.map((tag: any) => (
						<Tag
							color="blue"
							key={uuid()}
							style={{ borderRadius: "20px", fontSize: "14px" }}
						>
							{tag.tag_name}
						</Tag>
					))
				);
			},
			width: "100%",
		},
		{
			title: "Power",
			dataIndex: "power",
			key: uuid(),
			render: (
				power:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| null
					| undefined
			) => {
				return power === 10 ? (
					<div style={{ color: "red" }}>{power}</div>
				) : (
					power
				);
			},
		},
		{
			title: "Mobility",
			dataIndex: "mobility",
			key: uuid(),
			render: (
				mobility:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| null
					| undefined
			) => {
				return mobility === 10 ? (
					<div style={{ color: "red" }}>{mobility}</div>
				) : (
					mobility
				);
			},
		},
		{
			title: "Technique",
			dataIndex: "technique",
			key: uuid(),
			render: (
				technique:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| null
					| undefined
			) => {
				return technique === 10 ? (
					<div style={{ color: "red" }}>{technique}</div>
				) : (
					technique
				);
			},
		},
		{
			title: "Survivability",
			dataIndex: "survivability",
			key: uuid(),
			render: (
				survivability:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| null
					| undefined
			) => {
				return survivability === 10 ? (
					<div style={{ color: "red" }}>{survivability}</div>
				) : (
					survivability
				);
			},
		},
		{
			title: "Energy",
			dataIndex: "energy",
			key: uuid(),
			render: (
				energy:
					| string
					| number
					| boolean
					| ReactElement<any, string | JSXElementConstructor<any>>
					| ReactFragment
					| null
					| undefined
			) => {
				return energy === 10 ? (
					<div style={{ color: "red" }}>{energy}</div>
				) : (
					energy
				);
			},
		},
	];

	const handleChange = (tag: string, checked: any) => {
		const nextSelectedTags = checked
			? [...selectedTags, tag]
			: selectedTags.filter((t) => t !== tag);
		setSelectedTags(nextSelectedTags);
	};

	const onSelectChange = (newSelectedRowKeys: any, selectedRows: any) => {
		setSelectedRowKeys(newSelectedRowKeys);
		setSelectedRow(selectedRows);
	};

	const rowSelection = {
		hideSelectAll: true,
		preserveSelectedRowKeys: true,
		selectedRowKeys: selectedRowKeys,
		onChange: onSelectChange,
		getCheckboxProps: () => ({
			disabled: selectedRow.length >= 6,
		}),
	};

	const handleRemove = (key: any) => {
		let temp = selectedRow.filter(function (obj: any) {
			return obj.key !== key;
		});
		let keys = selectedRowKeys.filter(function (obj: any) {
			return obj !== key;
		});
		setSelectedRowKeys(keys);
		setSelectedRow(temp);
	};

	return (
		<span
			style={{
				marginTop: "6rem",
			}}
		>
			<div>
				{avg.power !== -1 &&
					selectedRow.map((v: any, idx) => {
						return (
							idx < 6 && (
								<Tooltip title="Remove" key={v.key}>
									<Avatar
										size={74}
										src={v.avatar}
										onClick={() => handleRemove(v.key)}
                    style={{border:"solid 1px #217AFF"}}
									/>
								</Tooltip>
							)
						);
					})}
			</div>
			<h2>
				{avg.power === -1
					? "Select the squad to defend earthrealm"
					: "Your champions!"}
			</h2>
			<Row gutter={16}>
				<Col span={4}>
					<Statistic
						title="Power"
						value={avg.power === -1 ? "-" : `${avg.power}`}
					/>
				</Col>
				<Col span={4}>
					<Statistic
						title="Mobility"
						value={avg.mobility === -1 ? "-" : `${avg.mobility}`}
					/>
				</Col>
				<Col span={4}>
					<Statistic
						title="Technique"
						value={avg.technique === -1 ? "-" : `${avg.technique}`}
					/>
				</Col>
				<Col span={4}>
					<Statistic
						title="Survivability"
						value={avg.survivability === -1 ? "-" : `${avg.survivability}`}
					/>
				</Col>
				<Col span={4}>
					<Statistic
						title="Energy"
						value={avg.energy === -1 ? "-" : `${avg.energy}`}
					/>
				</Col>
			</Row>
			<h5>*Totals as average of the squad</h5>
			<Input
				type="text"
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
				placeholder="search by name here.."
				prefix={<SearchOutlined />}
				style={{ width: "30%", borderRadius: "5px",scale:"1.2",margin:"20px" }}
			/>
			<div style={{ padding: "20px" }}>
				{tagsData.map((tag) => (
					<CheckableTag
						key={tag}
						checked={selectedTags.indexOf(tag) > -1}
						onChange={(checked) => handleChange(tag, checked)}
						style={{
							fontSize: "16px",
							border: "solid",
							borderRadius: "15px",
						}}
					>
						{tag}
					</CheckableTag>
				))}
				<Button
					onClick={() => {
						setSelectedTags([""]);
						setSearchedArray(datasource);
					}}
					style={{ border: "none" }}
				>
					<u>Clear all</u>
				</Button>
			</div>

			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={searchedArray}
			/>
		</span>
	);
};

export default Characters;
