'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::form.form', ({ strapi }) => ({
  async create(ctx) {
    const response = await super.create(ctx);

    try {
      const { teamName, members } = ctx.request.body.data;

      if (!teamName || !Array.isArray(members) || members.length === 0) {
        strapi.log.error('Team name or members data is missing.');
        return ctx.badRequest('Team name or members data is missing.');
      }

      // Create list of member names in HTML
	const memberList = members
  	.map((member, index) => `<li>${member.name} ${member.surname || ''}</li>`)
  	.join('');

      // Loop and send email to each member
      for (const member of members) {
        if (member.email && member.name) {
          await strapi.plugins['email'].services.email.send({
            from: 'cyberwarrior2025@cpe.kmutt.ac.th',
            to: member.email,
            subject: 'ยืนยันการลงทะเบียนสมัครเข้าร่วมการแข่งขัน Cyber Warrior Hackathon 2025',
            html: `
	      <p>เรียน คุณ ${member.name} ${member.surname || ''},</p>

              <p>ขอขอบคุณที่สมัครเข้าร่วมการแข่งขัน <strong>Cyber Warrior Hackathon 2025</strong> การลงทะเบียนของท่านเสร็จสมบูรณ์แล้ว !</p>

              <h4>ข้อมูลทีมที่ลงทะเบียน</h4>
              <p><strong>ชื่อทีม:</strong> ${teamName}</p>

              <p><strong>สมาชิกในทีม:</strong></p>
              <ol>
                ${memberList}
              </ol>

              <p>กรุณาตรวจสอบความถูกต้องของข้อมูลข้างต้น หากต้องการแก้ไขหรือเพิ่มเติมข้อมูล 
              กรุณาติดต่อทีมงานภายใน 3 วัน ทาง <a href="mailto:cyberwarrior2025@kmutt.ac.th">cyberwarrior2025@kmutt.ac.th</a> 
              หรือติดต่อคุณภิรดา บินรามัน (ดา) โทร 024709630, 0952415393 คุณภัทรานิษฐ์ ปิตินันท์พงศ์ (โบว์)  02-470-9387</p>
             
	      <p>ประกาศรายชื่อทีมที่ผ่านการคัดเลือกจะเผยแพร่บนเว็บไซต์ในวันที่ <strong>2 มิถุนายน 2025</strong></p>

              <p>ท่านสามารถศึกษากติกาและแนวทางการแข่งขันเพิ่มเติมได้ที่ <a href="https://cyberwarrior2025.io" target="_blank">https://cyberwarrior2025.io</a> 
              เพื่อรักษาสิทธิ์ประโยชน์ของท่าน</p>

              <br/>
              <p>ขอแสดงความนับถือ,</p>
              <p>Team Cyber Warrior 2025<br/>
              Computer Engineering Department, Faculty of Engineering, KMUTT</p>
            `,
            replyTo: 'cyberwarrior2025@cpe.kmutt.ac.th',
          });
        }
      }
    } catch (err) {
      strapi.log.error('❌ Error sending confirmation email:', err);
      strapi.log.error('📧 Email config:', {
        user: process.env.SMTP_USERNAME,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
      });
    }

    return response;
  }
}));
