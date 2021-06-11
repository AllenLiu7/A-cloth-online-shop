import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
//import './collection-page.styles.scss';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop-items/shop-item.selectors';

function CollectionPage({ collection }) {
  const { items, title } = collection;
  return (
    <Container>
      <Title>{title}</Title>
      <Collections>
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </Collections>
    </Container>
  );
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h2`
  font-size: 40px;
`;

const Collections = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 50px;
  padding-top: 40px;
  padding-left: 80px;
  .collection-item {
    width: 80%;
  }
`;
