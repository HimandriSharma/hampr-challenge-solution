import { Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import jsonData from "../data/characters.json";
import type { Character, CharacterTag } from "../types";
const data: Character[] = jsonData as Character[];

const Characters = () => {
	const datasource = data.map((row) => ({
		key: row.name,
		name: row.name,
		power: row.abilities[3].abilityScore,
		mobility: row.abilities[0].abilityScore,
		technique: row.abilities[1].abilityScore,
		survivability: row.abilities[2].abilityScore,
		energy: row.abilities[4].abilityScore,
		tags: row.tags,
	}));
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [searchedArray, setSearchedArray] = useState(datasource);
	const [searchString, setSearchString] = useState("");
	useEffect(() => {
		if (searchString.length === 0) {
			setSearchedArray(datasource);
		} else {
			const searchedObjects: any[] = [];
			datasource.forEach((singleDataObject, index) => {
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

	const columns = [
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
						<Tag color="blue" key={uuid()}>
							{tag.tag_name}
						</Tag>
					))
				);
			},
		},
		{
			title: "Power",
			dataIndex: "power",
			key: uuid(),
		},
		{
			title: "Mobility",
			dataIndex: "mobility",
			key: uuid(),
		},
		{
			title: "Technique",
			dataIndex: "technique",
			key: uuid(),
		},
		{
			title: "Survivability",
			dataIndex: "survivability",
			key: uuid(),
		},
		{
			title: "Energy",
			dataIndex: "energy",
			key: uuid(),
		},
	];
	const onSelectChange = (newSelectedRowKeys: any) => {
		console.log("selectedRowKeys changed: ", newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const rowSelection = {
		hideSelectAll: true,
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<>
     <p>
        <Input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="search here.."
        />
      </p>
			<Table
				rowSelection={rowSelection}
				columns={columns}
				dataSource={searchedArray}
			/>
		</>
	);
};

export default Characters;
