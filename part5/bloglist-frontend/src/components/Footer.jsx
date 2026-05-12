const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
    marginTop: 20,
    paddingTop: 10,
    borderTop: '1px solid #ccc',
    textAlign: 'center',
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Blog app, Department of Computer Science, University of Helsinki 2024
      </em>
    </div>
  )
}

export default Footer
