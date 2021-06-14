import { makeStyles } from '../../utils';

export default makeStyles.create({
  textHeader: {
    display: 'flex',
    alignItems: 'start',
    fontWeight: 600,
    fontSize: 28,
    padding: '5px 20px',
  },
  textHeaderBody: {
    display: 'flex',
    alignItems: 'start',
    fontWeight: 400,
    fontSize: 24,
    padding: '5px 20px',
  },
  textTitleBody: {
    display: 'flex',
    alignItems: 'start',
    fontWeight: 600,
    fontSize: 18,
    padding: '20px 20px 5px 20px',
  },
  textBody: {
    display: 'flex',
    alignItems: 'start',
    fontWeight: 400,
    fontSize: 14,
    padding: '5px 20px',
  },
  defaultButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    textAlign: 'center',
  },
});
