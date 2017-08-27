import React from 'react';
import { Header, Table, Loader } from 'semantic-ui-react';
import SAMPLE_MENU from '../assets/pdfs/celiac_camp_menu_2017.pdf';
import DangerousComponent from './DangerousComponent';

const SampleMenu = ({ data }) => {
  if (!data) return <Loader active />;
  const info = data.pages.sample_menu;
  return (
    <div className="sample-menu">
      <Header as="h2">{info.title.value}</Header>
      <DangerousComponent value={info.text_section_1.value} />
      <Table celled striped fixed style={{ textAlign: 'center' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Day 1</Table.HeaderCell>
            <Table.HeaderCell>Day 2</Table.HeaderCell>
            <Table.HeaderCell>Day 3</Table.HeaderCell>
            <Table.HeaderCell>Day 4</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>No Breakfast</Table.Cell>
            <Table.Cell>
              <strong>French Toast</strong> (Canyon Bakehouse),
            <br />
              <strong>Bacon</strong> (Jones Dairy Farm),
            <br />
              <strong>Cereal</strong>,
            <br />
              <strong>Oatmeal</strong>,
            <br />
              <strong>Fresh Fruit</strong>
            </Table.Cell>
            <Table.Cell>
              <strong>Eggs</strong>,
            <br />
              <strong>Bacon</strong> (Jones Dairy Farm),
            <br />
              <strong>Toaster Pastries</strong> (Glutino),
            <br />
              <strong>English Muffin</strong> (Glutino),
            <br />
              <strong>Biscuits</strong> (Bella Gluten Free),
            <br />
              <strong>Cereal</strong>,
            <br />
              <strong>Fresh Fruit</strong>,
            <br />
              <strong>Granola</strong>
            </Table.Cell>
            <Table.Cell>
              <strong>Sesame and Plain Bagels</strong> (Mariposa),
            <br />
              <strong>Blueberry Muffin</strong> (Udi&#39;s),
            <br />
              <strong>Cinnamon Rolls</strong> (Mariposa),
            <br />
              <strong>Bacon</strong> (Jones Dairy Farm),
            <br />
              <strong>Pancakes</strong> (Kodiak Cakes),
            <br />
              <strong>Cereal</strong>,
            <br />
              <strong>Fresh Fruit</strong>,
            <br />
              <strong>Granola</strong>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
            Lunch brought in by Celiac Camp for Volunteers (Dining Hall)
          </Table.Cell>
            <Table.Cell>
              <strong>Chicken Stripe</strong>,
            <br />
              <strong>Grilled Cheese</strong> (Canyon Bakehouse),
            <br />
              <strong>Garden Minestrone Soup</strong> (Boulder Organic),
            <br />
              <strong>Sandwich & Salad Bar</strong>
              <br />
              <strong>Chocolate Chip Cookies</strong> (Mariposa)
          </Table.Cell>
            <Table.Cell>
              <strong>Hot Dogs</strong> (SF Provisions),
            <br />
              <strong>Hot Dog Buns</strong> (Canyon Bakehouse),
            <br />
              <strong>Mac n&#39;Cheese</strong>,
            <br />
              <strong>Dairy Free Mac n&#39; Cheese</strong>
              <br />
              <strong>Sandwich & Salad Bar</strong>
              <br />
              <strong>Sugar Cookies</strong> (Mariposa)
          </Table.Cell>
            <Table.Cell>
            Lunch brought in by Celiac Camp for Volunteers (Dining Hall)
          </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <br />
              <strong>Taco Night</strong>,
            <br />
              <strong>S&#39;mores</strong> (Dr. Schar)
          </Table.Cell>
            <Table.Cell>
              <strong>Lasagna</strong> (Manini&#39;s),
            <br />
              <strong>Dairy-Free Lasagna</strong> (Amy&#39;s),
            <br />
              <strong>Garlic Bread</strong> (Mariposa),
            <br />
              <strong>Caesar Salad</strong>,
            <br />
              <strong>Ice Cream Sundaes</strong>
            </Table.Cell>
            <Table.Cell>
              <strong>Tri Tip</strong>,
            <br />
              <strong>Mashed Potatoes</strong> (Amy&#39;s),
            <br />
              <strong>Veggies</strong>,
            <br />
              <strong>Dinner Rolls</strong>,
            <br />
              <strong>Birthday Cake</strong>
            </Table.Cell>
            <Table.Cell>
            No Dinner
          </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <DangerousComponent value={info.text_section_2.value} />
    </div>
  );
};

export default SampleMenu;
