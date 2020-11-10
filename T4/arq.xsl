<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="index.html">
            <html>
                <head>
                    <title>Arqueossítios do NW Português</title>
                </head> 
                
                <body>
                    
                    <h2>Arqueossítios do NW Português</h2>
                    <h3>Indice</h3>
                    <xsl:apply-templates select="//ARQELEM" mode="indice">
                            <xsl:sort case-order="lower-first" select="IDENTI"></xsl:sort>
                        </xsl:apply-templates>
                    
                </body>
            </html>
        </xsl:result-document>
            <xsl:apply-templates select="//ARQELEM">
            <xsl:sort select="IDENTI"></xsl:sort>
            </xsl:apply-templates>
    </xsl:template>
    
    
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{position()}"/>
            <a href="http://localhost:5555/arqs/{position()}">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM">
        
        <xsl:result-document href="site/arq{position()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <div>
                        <h2>Dados:</h2>
                        <p><b>Identidade:</b> <xsl:value-of select="IDENTI"/></p>
                        
                        <xsl:if test="LUGAR[text() != '']">
                            <p><b>Lugar:</b> <xsl:value-of select="LUGAR"/></p>
                        </xsl:if>
                        <xsl:if test="FREGUE[text() != '']">
                            <p><b>Freguesia:</b> <xsl:value-of select="FREGUE"/></p>
                        </xsl:if>
                        <xsl:if test="CONCEL[text() != '']">
                            <p><b>Concelho:</b> <xsl:value-of select="CONCEL"/></p>
                        </xsl:if>
                        <xsl:if test="CODADM[text() != '']">
                            <p><b>Código Administrativo:</b> <xsl:value-of select="CODADM"/></p>
                        </xsl:if>
                        <xsl:if test="LATITU[text() != '']">
                            <p><b>Latitude:</b> <xsl:value-of select="LATITU"/></p>
                        </xsl:if>
                        <xsl:if test="LONGIT[text() != '']">
                            <p><b>Longitude:</b> <xsl:value-of select="LONGIT"/></p>
                        </xsl:if>
                        <xsl:if test="ALTITU[text() != '']">
                            <p><b>Altitude:</b> <xsl:value-of select="ALTITU"/></p>
                        </xsl:if>                     
                    </div>
                    
                    <div>
                        <h2>Detalhes:</h2>
                        <xsl:if test="IMAGEM[text() != '']">
                            <p><b>Imagem:</b><xsl:value-of select="IMAGEM"/></p>
                        </xsl:if>
                        <xsl:if test="DESCRI[text() != '']">
                            <p><b>Descrição:</b><xsl:value-of select="DESCRI"/></p>
                        </xsl:if>
                        <xsl:if test="CRONO[text() != '']">
                            <p><b>Cronologia:</b><xsl:value-of select="CRONO"/></p>
                        </xsl:if>
                        <xsl:if test="INTERP[text() != '']">
                            <p><b>Interpretação:</b><xsl:value-of select="INTERP"/></p>
                        </xsl:if>
                        <xsl:if test="ACESSO[text() != '']">
                            <p><b>Acesso:</b><xsl:value-of select="ACESSO"/></p>
                        </xsl:if>
                        <xsl:if test="QUADRO[text() != '']">
                            <p><b>Quadro: </b><xsl:value-of select="QUADRO"/></p>
                        </xsl:if>
                        <xsl:if test="TRAARQ[text() != '']">
                            <p><b>Trabalhos Arqueológicos: </b><xsl:value-of select="TRAARQ"/></p>
                        </xsl:if>
                        <xsl:if test="DESARQ[text() != '']">
                            <p><b>Descrição Arqueológica:</b><xsl:value-of select="DESARQ"/></p>
                        </xsl:if>
                        <xsl:if test="INTERE[text() != '']">
                            <p><b>Interesse:</b><xsl:value-of select="INTERE"/></p>
                        </xsl:if>
                        <xsl:if test="DEPOSI[text() != '']">
                            <p><b>Deposito:</b><xsl:value-of select="DEPOSI"/></p>
                        </xsl:if>
                    </div>
                    
                    <div>
                        <xsl:if test="BIBLIO[text() != '']">
                            <h2>Bibliografia:</h2>
                            <p><xsl:value-of select="BIBLIO"/></p>
                        </xsl:if>
                    </div>
                    
                    <div>
                        <xsl:if test="position() != 1">
                            [<a href="http://localhost:5555/arqs/{position()-1}">Anterior</a>]
                        </xsl:if>
                        [<a href="http://localhost:5555/arqs#i{position()}">Voltar à Página Inicial</a>]
                        <xsl:if test="position() != last()">
                            [<a href="http://localhost:5555/arqs/{position()+1}">Seguinte</a>]
                        </xsl:if>
                    </div>
                    
                    <center>
                        <hr width="90%"/>
                    </center>
                </body>
            </html>
        </xsl:result-document>
        
    </xsl:template>
    
    
</xsl:stylesheet>